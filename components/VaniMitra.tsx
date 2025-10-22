import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';
import { useLanguage, useTranslations } from '../hooks/useTranslations';
import type { Message } from '../types';
import { XMarkIcon, SparklesIcon, UserIcon, MicrophoneIcon } from './Icons';

// --- Audio Encoding/Decoding utilities as per Gemini Live API documentation ---

function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Component ---

interface VaniMitraProps {
    isOpen: boolean;
    onClose: () => void;
    documentText: string;
    chatHistory: Message[];
    setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
}

type Status = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

const ANALYSER_FFT_SIZE = 64; // Gives 32 data points

export const VaniMitra: React.FC<VaniMitraProps> = ({ isOpen, onClose, documentText, chatHistory, setChatHistory }) => {
    const { t } = useTranslations();
    const { language } = useLanguage();

    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);
    const [analyserData, setAnalyserData] = useState(() => new Uint8Array(ANALYSER_FFT_SIZE / 2));

    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const inputAnalyserRef = useRef<AnalyserNode | null>(null);
    const outputAnalyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const nextStartTimeRef = useRef<number>(0);
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory]);

    const disconnect = useCallback(() => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
        }

        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;

        if (scriptProcessorRef.current) scriptProcessorRef.current.disconnect();
        if (mediaStreamSourceRef.current) mediaStreamSourceRef.current.disconnect();
        if (inputAnalyserRef.current) inputAnalyserRef.current.disconnect();
        if (outputAnalyserRef.current) outputAnalyserRef.current.disconnect();

        scriptProcessorRef.current = null;
        mediaStreamSourceRef.current = null;
        inputAnalyserRef.current = null;
        outputAnalyserRef.current = null;

        inputAudioContextRef.current?.close();
        outputAudioContextRef.current?.close();
        inputAudioContextRef.current = null;
        outputAudioContextRef.current = null;
        
        sessionPromiseRef.current?.then(session => session.close());
        sessionPromiseRef.current = null;
        
        outputSourcesRef.current.forEach(source => source.stop());
        outputSourcesRef.current.clear();
        nextStartTimeRef.current = 0;
        
        setStatus('idle');
    }, []);

    const connect = useCallback(async () => {
        if (!process.env.API_KEY) {
            setError(t('error_analysis_title'));
            setStatus('error');
            return;
        }
        
        try {
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (err: any) {
            console.error("Microphone access error:", err.name, err.message);
            if (err.name === 'NotAllowedError') setError(t('vani_mitra_mic_error_denied'));
            else if (err.name === 'NotFoundError') setError(t('vani_mitra_mic_error_not_found'));
            else setError(t('vani_mitra_mic_error_generic'));
            setStatus('error');
            return;
        }

        setStatus('listening');
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `You are a helpful AI assistant named LegalIQ.app...`;

        sessionPromiseRef.current = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                systemInstruction,
                responseModalities: [Modality.AUDIO],
                inputAudioTranscription: {},
            },
            callbacks: {
                onopen: () => {
                    inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
                    const ctx = inputAudioContextRef.current;
                    mediaStreamSourceRef.current = ctx.createMediaStreamSource(streamRef.current!);
                    scriptProcessorRef.current = ctx.createScriptProcessor(4096, 1, 1);
                    inputAnalyserRef.current = ctx.createAnalyser();
                    inputAnalyserRef.current.fftSize = ANALYSER_FFT_SIZE;
                    
                    scriptProcessorRef.current.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmBlob = createBlob(inputData);
                        sessionPromiseRef.current?.then((s) => s.sendRealtimeInput({ media: pcmBlob }));
                    };
                    mediaStreamSourceRef.current.connect(inputAnalyserRef.current);
                    inputAnalyserRef.current.connect(scriptProcessorRef.current);
                    scriptProcessorRef.current.connect(ctx.destination);
                },
                onmessage: async (message: LiveServerMessage) => {
                    if (message.serverContent?.inputTranscription?.text) setStatus('thinking');

                    const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                    if (base64Audio) {
                        setStatus('speaking');
                        if (!outputAudioContextRef.current || outputAudioContextRef.current.state === 'closed') {
                            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                        }
                        const ctx = outputAudioContextRef.current;
                        nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                        
                        const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                        const source = ctx.createBufferSource();
                        source.buffer = audioBuffer;
                        
                        outputAnalyserRef.current = ctx.createAnalyser();
                        outputAnalyserRef.current.fftSize = ANALYSER_FFT_SIZE;
                        
                        source.connect(outputAnalyserRef.current);
                        outputAnalyserRef.current.connect(ctx.destination);
                        
                        source.addEventListener('ended', () => {
                            outputSourcesRef.current.delete(source);
                            if (outputSourcesRef.current.size === 0) {
                                setStatus('listening');
                                outputAnalyserRef.current?.disconnect();
                                outputAnalyserRef.current = null;
                            }
                        });
                        source.start(nextStartTimeRef.current);
                        // FIX: Using simple assignment instead of compound assignment to prevent potential TypeScript type errors with refs.
                        nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
                        outputSourcesRef.current.add(source);
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error('Live session error:', e);
                    setError(t('vani_mitra_connection_error'));
                    setStatus('error');
                    disconnect();
                },
                onclose: () => {},
            },
        });

    }, [documentText, t, disconnect]);
    
    useEffect(() => {
        let active = true;
        const draw = () => {
            if (!active) return;
            const analyser = status === 'listening' ? inputAnalyserRef.current : (status === 'speaking' ? outputAnalyserRef.current : null);
            if (analyser) {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
                setAnalyserData(dataArray);
            }
            animationFrameRef.current = requestAnimationFrame(draw);
        };

        if (status === 'listening' || status === 'speaking') {
            draw();
        } else {
            setAnalyserData(new Uint8Array(ANALYSER_FFT_SIZE / 2));
        }

        return () => {
            active = false;
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [status]);

    useEffect(() => {
        if (isOpen) {
            connect();
        } else {
            disconnect();
        }
        return () => disconnect();
    }, [isOpen, connect, disconnect]);

    const statusInfo: Record<Status, { text: string; pulsate: boolean }> = {
        idle: { text: t('vani_mitra_thinking'), pulsate: true },
        listening: { text: t('vani_mitra_listening'), pulsate: false },
        thinking: { text: t('vani_mitra_thinking'), pulsate: true },
        speaking: { text: t('vani_mitra_speaking'), pulsate: false },
        error: { text: error || t('vani_mitra_error'), pulsate: false },
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>
            <div className={`relative w-full h-full flex flex-col bg-brand-card shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
                <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <SparklesIcon className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-lg font-bold text-brand-light">Vani Mitra</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                
                <main className="flex-1 flex flex-col justify-between overflow-y-auto p-4 space-y-4">
                    <div className="flex-1 space-y-4">
                        <div className="p-4 bg-brand-dark/50 rounded-lg text-center">
                            <p className="text-base text-gray-300">{t('vani_mitra_welcome')}</p>
                        </div>
                        {/* Chat history rendering... */}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <div className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-colors ${status === 'error' ? 'bg-red-500/20' : 'bg-brand-gold/10'}`}>
                            
                            {/* Audio Visualizer */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {Array.from(analyserData).map((value, i) => {
                                    const barHeight = Math.max(2, (value / 255) * 110);
                                    const angle = (i / (analyserData.length || 1)) * 360;
                                    return (
                                        <div
                                            key={i}
                                            className="absolute w-1 bg-brand-gold/50 rounded-full origin-bottom"
                                            style={{
                                                height: `${barHeight}px`,
                                                transform: `rotate(${angle}deg) translateY(-60px)`,
                                                transition: 'height 0.05s ease-out'
                                            }}
                                        />
                                    );
                                })}
                            </div>

                            {statusInfo[status].pulsate && <div className={`absolute inset-0 rounded-full animate-pulse ${status === 'error' ? 'bg-red-500/30' : 'bg-brand-gold/20'}`}></div>}
                            <div className="relative w-24 h-24 rounded-full bg-brand-card flex items-center justify-center">
                                <MicrophoneIcon className={`w-10 h-10 ${status === 'error' ? 'text-red-400' : 'text-brand-gold'}`} />
                            </div>
                        </div>
                        <p className={`text-lg font-semibold min-h-[28px] ${status === 'error' ? 'text-red-300' : 'text-gray-300'}`}>{statusInfo[status].text}</p>
                    </div>
                </main>
            </div>
        </div>
    );
};