import React, { useState, useEffect, useRef, useCallback } from 'react';
// FIX: The `LiveSession` type is not exported from the main package.
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { useLanguage, useTranslations } from '../hooks/useTranslations';
import type { Message } from '../types';
import type { Language } from '../translations';
import { XMarkIcon, SparklesIcon, UserIcon, MicrophoneIcon, LawBookIcon } from './Icons';

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

interface AiLegalSupportProps {
    isOpen: boolean;
    onClose: () => void;
    chatHistory: Message[];
    setChatHistory: React.Dispatch<React.SetStateAction<Message[]>>;
}

type Status = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

const ANALYSER_FFT_SIZE = 64; // Gives 32 data points

export const AiLegalSupport: React.FC<AiLegalSupportProps> = ({ isOpen, onClose, chatHistory, setChatHistory }) => {
    const { t } = useTranslations();
    const { language } = useLanguage();

    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<string | null>(null);
    const [analyserData, setAnalyserData] = useState(() => new Uint8Array(ANALYSER_FFT_SIZE / 2));
    const [liveInput, setLiveInput] = useState('');

    // FIX: Replaced non-exported type `LiveSession` with `any`.
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
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
    const currentInputRef = useRef('');
    const currentOutputRef = useRef('');
    
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatHistory, liveInput]);

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

        inputAudioContextRef.current?.close().catch(console.error);
        outputAudioContextRef.current?.close().catch(console.error);
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
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') setError(t('ai_legal_support_mic_error_denied'));
            else if (err.name === 'NotFoundError') setError(t('ai_legal_support_mic_error_not_found'));
            else setError(t('ai_legal_support_mic_error_generic'));
            setStatus('error');
            return;
        }

        setStatus('listening');
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const languageMap: Partial<Record<Language, string>> = {
            en: 'English',
            hi: 'Hindi',
            bn: 'Bengali',
            mr: 'Marathi',
            te: 'Telugu',
        };
        const targetLanguage = languageMap[language] || 'English';

        const systemInstruction = `You are an AI Legal Consultant from LegalIQ.app, and your name is Legal Mitra. Your goal is to provide helpful, general information about legal topics in India.
- In your VERY FIRST response of the conversation ONLY, you MUST introduce yourself as "Legal Mitra" and include this exact disclaimer: "Disclaimer: I am an AI assistant, not a lawyer. This information is for educational purposes only. Please consult a qualified lawyer for legal advice."
- For all subsequent responses, DO NOT repeat the introduction or the disclaimer. Just answer the user's question directly.
- Your primary rule is to respond in the same language the user speaks. The user's preferred language is ${targetLanguage}, so prioritize it, but always match the user's spoken language.
- Keep responses concise and easy for a non-expert to understand.
- Do not provide legal advice.`;

        sessionPromiseRef.current = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-09-2025',
            config: {
                systemInstruction,
                responseModalities: [Modality.AUDIO],
                inputAudioTranscription: {},
                outputAudioTranscription: {},
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
                    if (message.serverContent?.inputTranscription) {
                        setStatus('thinking');
                        const text = message.serverContent.inputTranscription.text;
                        currentInputRef.current += text;
                        setLiveInput(currentInputRef.current);
                    }
                    if (message.serverContent?.outputTranscription) {
                        const text = message.serverContent.outputTranscription.text;
                        currentOutputRef.current += text;
                    }

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
                        nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
                        outputSourcesRef.current.add(source);
                    }

                    const interrupted = message.serverContent?.interrupted;
                    if (interrupted) {
                        outputSourcesRef.current.forEach(source => {
                            source.stop();
                            outputSourcesRef.current.delete(source);
                        });
                        nextStartTimeRef.current = 0;
                        currentOutputRef.current = '';
                    }

                    if (message.serverContent?.turnComplete) {
                        const finalInput = currentInputRef.current.trim();
                        const finalOutput = currentOutputRef.current.trim();
                        
                        setChatHistory(prev => {
                            const newHistory = [...prev];
                            if (finalInput) newHistory.push({ role: 'user', text: finalInput });
                            if (finalOutput) newHistory.push({ role: 'model', text: finalOutput });
                            return newHistory;
                        });
                        
                        currentInputRef.current = '';
                        currentOutputRef.current = '';
                        setLiveInput('');
                        
                        if (outputSourcesRef.current.size === 0) {
                            setStatus('listening');
                        }
                    }
                },
                onerror: (e: ErrorEvent) => {
                    console.error('Live session error:', e);
                    setError(t('ai_legal_support_connection_error'));
                    setStatus('error');
                    disconnect();
                },
                onclose: () => {},
            },
        });

    }, [t, disconnect, setChatHistory, language]);
    
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
            // Reset state for new session
            setChatHistory([]);
            setLiveInput('');
            currentInputRef.current = '';
            currentOutputRef.current = '';
            setError(null);
            connect();
        } else {
            disconnect();
        }
        return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const statusInfo: Record<Status, { text: string; pulsate: boolean }> = {
        idle: { text: t('ai_legal_support_thinking'), pulsate: true },
        listening: { text: t('ai_legal_support_listening'), pulsate: false },
        thinking: { text: t('ai_legal_support_thinking'), pulsate: true },
        speaking: { text: t('ai_legal_support_speaking'), pulsate: false },
        error: { text: error || t('ai_legal_support_error'), pulsate: false },
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>
            <div className={`relative w-full h-full flex flex-col bg-brand-card shadow-2xl transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
                <header className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <LawBookIcon className="h-6 w-6 text-brand-gold" />
                        <h2 className="text-lg font-bold text-brand-light">{t('ai_legal_support_modal_title')}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-gold">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                
                <main className="flex-1 flex flex-col justify-between overflow-hidden p-4 space-y-4">
                    <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar pr-2">
                        <div className="p-4 bg-brand-dark/50 rounded-lg text-center">
                            <p className="text-base text-gray-300">{t('ai_legal_support_welcome')}</p>
                        </div>
                        {chatHistory.map((msg, index) => (
                             <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center"><SparklesIcon className="w-5 h-5 text-brand-gold" /></div>
                                )}
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-brand-gold text-brand-dark rounded-br-none' : 'bg-gray-700 text-brand-light rounded-bl-none'}`}>
                                    <p className="text-base whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                {msg.role === 'user' && (
                                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><UserIcon className="w-5 h-5 text-gray-400" /></div>
                                )}
                            </div>
                        ))}
                         {liveInput && (
                            <div className="flex items-start gap-3 justify-end animate-fade-in">
                                <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-brand-gold/50 text-brand-light italic rounded-br-none">
                                    <p className="text-base whitespace-pre-wrap">{liveInput}</p>
                                </div>
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center"><UserIcon className="w-5 h-5 text-gray-400" /></div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <div className={`relative flex items-center justify-center w-28 h-28 rounded-full transition-colors ${status === 'error' ? 'bg-red-500/20' : 'bg-brand-gold/10'}`}>
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                                {Array.from({ length: analyserData.length }).map((_, i) => {
                                    const value = analyserData[i] || 0;
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