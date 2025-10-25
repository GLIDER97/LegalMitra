import { GoogleGenAI, Type, Modality, GenerateContentResponse, Chat } from "@google/genai";
import type { AnalysisResult, SwotAnalysis, RedFlag, NegotiationPoint, JargonTerm, Message, GroundingInfo } from '../types';
import type { Language } from '../translations';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const languageMap: Partial<Record<Language, string>> = {
    en: 'English',
    hi: 'Hindi',
    bn: 'Bengali',
    mr: 'Marathi',
    te: 'Telugu',
};

/**
 * Handles errors from the Gemini API, converting them into user-friendly messages.
 * @param error - The error caught from the API call.
 * @throws A new Error with a user-friendly message.
 */
function handleGeminiError(error: unknown): never {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        const errorMessage = error.message.toLowerCase();
        
        // Invalid API Key - This is a server configuration issue, not user-fixable.
        if (errorMessage.includes('api key not valid') || errorMessage.includes('permission denied')) {
            throw new Error("Service Configuration Error: There's an issue with the application's connection to the AI service. Please try again later, as our team is likely already addressing it.");
        }

        // Rate Limiting
        if (errorMessage.includes('rate limit') || errorMessage.includes('resource has been exhausted')) {
            throw new Error("High Demand: The AI service is currently experiencing high demand. Please wait a moment and try your request again.");
        }

        // Network Issues (client-side)
        if (errorMessage.includes('failed to fetch')) {
             throw new Error("Network Error: Could not connect to the AI service. Please check your internet connection and retry.");
        }

        // Server-side errors from the API
        if (errorMessage.includes('500') || errorMessage.includes('503') || errorMessage.includes('internal')) {
             throw new Error("AI Service Unavailable: The service is currently experiencing technical difficulties. Please try again in a few minutes.");
        }
        
        // For other API errors, provide a generic but informative message.
        throw new Error(error.message || "An unexpected error occurred while communicating with the AI. Please try again.");
    }

    // Fallback for non-Error objects
    throw new Error("An unknown error occurred while communicating with the AI service. Please try again.");
}


// Generic function to handle API calls and errors
async function generateContentWithSchema<T>(prompt: string, schema: any): Promise<T> {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.2,
            },
        });
        const jsonText = response.text;
        return JSON.parse(jsonText.trim()) as T;
    } catch (error) {
        handleGeminiError(error);
    }
}


// --- Schema and Function for Summary & Title ---
const summarySchema = {
    type: Type.OBJECT,
    properties: {
        documentTitle: {
            type: Type.STRING,
            description: "The main title or heading of the document. If no clear title is present, generate a concise and descriptive title based on the content (max 5-10 words)."
        },
        summary: {
            type: Type.STRING,
            description: "A very short, simple, and concise summary of the document's purpose and key aspects, maximum 3-4 sentences. It must be extremely easy for a non-expert to understand."
        },
    },
    required: ["documentTitle", "summary"]
};

export const getSummary = (documentText: string, language: Language) => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Analyze the document to provide a title and a very short, simple, and concise summary in ${targetLanguage}. The summary should be a maximum of 3-4 sentences and extremely easy for a non-expert to understand.\n\nDOCUMENT:\n---\n${documentText}\n---`;
    return generateContentWithSchema<{ documentTitle: string; summary: string }>(prompt, summarySchema);
};

// --- Schema and Function for Complexity Score ---
const complexitySchema = {
    type: Type.OBJECT,
    properties: {
        complexityScore: {
            type: Type.NUMBER,
            description: "A score from 1 (very simple) to 10 (highly complex and requires legal counsel)."
        }
    },
    required: ["complexityScore"]
};

export const getComplexityScore = (documentText: string, language: Language) => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Analyze the document's legal complexity and return a score from 1 to 10. The user language is ${targetLanguage}.\n\nDOCUMENT:\n---\n${documentText}\n---`;
    return generateContentWithSchema<{ complexityScore: number }>(prompt, complexitySchema);
};

// --- Schema and Function for SWOT Analysis ---
const swotSchema = {
    type: Type.OBJECT,
    properties: {
        swot: {
            type: Type.OBJECT,
            properties: {
                strengths: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of positive aspects. Each item must be a short, simple, and easy-to-understand phrase." },
                weaknesses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of unfavorable clauses or ambiguities. Each item must be a short, simple, and easy-to-understand phrase." },
                opportunities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of areas for improvement. Each item must be a short, simple, and easy-to-understand phrase." },
                threats: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of significant risks or liabilities. Each item must be a short, simple, and easy-to-understand phrase." },
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"]
        }
    },
    required: ["swot"]
};

export const getSwot = (documentText: string, language: Language) => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Perform a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) on the document in ${targetLanguage}. For each point in the SWOT analysis, keep the text very short, concise, and easy for a non-expert to understand. Each point should be a brief, single phrase or sentence, like a bullet point.\n\nDOCUMENT:\n---\n${documentText}\n---`;
    return generateContentWithSchema<{ swot: SwotAnalysis }>(prompt, swotSchema);
};

// --- Schema and Function for Red Flags ---
const redFlagsSchema = {
    type: Type.OBJECT,
    properties: {
        redFlags: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    flag: { type: Type.STRING, description: "A concise summary of the potential red flag." },
                    explanation: { type: Type.STRING, description: "A brief explanation of why this is a potential issue." },
                    citation: { type: Type.STRING, description: "The specific page number and section/subsection from the document where this red flag is located (e.g., 'Page 5, Section 3.2'). If not available, provide the best possible reference." },
                    example: { type: Type.STRING, description: "A simple, one-sentence example that illustrates the risk in a real-world scenario." }
                },
                required: ["flag", "explanation", "citation"]
            },
        }
    },
    required: ["redFlags"]
};

export const getRedFlags = (documentText: string, language: Language) => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Identify potential 'red flags' in the document. For each, provide a flag, explanation, citation, and a simple example. Respond in ${targetLanguage}.\n\nDOCUMENT:\n---\n${documentText}\n---`;
    return generateContentWithSchema<{ redFlags: RedFlag[] }>(prompt, redFlagsSchema);
};

// --- Schema and Function for Negotiation Points ---
const negotiationPointsSchema = {
    type: Type.OBJECT,
    properties: {
        negotiationPoints: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    point: { type: Type.STRING, description: "A concise summary of the point to negotiate." },
                    explanation: { type: Type.STRING, description: "A brief explanation of what to ask for and why." },
                    example: { type: Type.STRING, description: "A simple, one-sentence example of what the user might say or ask for." }
                },
                required: ["point", "explanation"]
            },
        }
    },
    required: ["negotiationPoints"]
};

export const getNegotiationPoints = (documentText: string, language: Language) => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `Identify actionable 'Points to Negotiate' in the document. For each, provide the point, an explanation, and an example. Respond in ${targetLanguage}.\n\nDOCUMENT:\n---\n${documentText}\n---`;
    return generateContentWithSchema<{ negotiationPoints: NegotiationPoint[] }>(prompt, negotiationPointsSchema);
};

// --- Schema and Function for Jargon Glossary ---
const jargonGlossarySchema = {
    type: Type.OBJECT,
    properties: {
        jargonGlossary: {
            type: Type.ARRAY,
            description: "A list of technical or legal jargon terms. For each, provide a simple, one-sentence definition.",
            items: {
                type: Type.OBJECT,
                properties: {
                    term: { type: Type.STRING, description: "The legal or technical term." },
                    definition: { type: Type.STRING, description: "The simple, easy-to-understand definition." }
                },
                required: ["term", "definition"]
            }
        }
    },
    required: ["jargonGlossary"]
};

export const getJargonGlossary = (analysisText: string, language: Language) => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `From the following analysis text, compile a comprehensive list of ALL technical or legal jargon terms used. For each term, provide a very simple, one-sentence definition. Respond in ${targetLanguage}.\n\nANALYSIS TEXT:\n---\n${analysisText}\n---`;
    return generateContentWithSchema<{ jargonGlossary: JargonTerm[] }>(prompt, jargonGlossarySchema);
};

// --- Function for Real-World Grounding ---
export const getRealWorldGrounding = async (flagText: string, language: Language): Promise<GroundingInfo> => {
    const targetLanguage = languageMap[language] || 'English';
    const prompt = `As a "Legal Guardian," analyze the following legal risk: "${flagText}".
Your task is to find grounding information using Google Search and format it as a JSON object.

Instructions:
1.  **Indian Law:** Search for relevant Indian laws, prioritizing results from government sites like "indiacode.nic.in". For each law found, provide the full official name of the law (e.g., "The Indian Contract Act, 1872") and the specific section number (e.g., "Section 25"). Provide a simple explanation.
2.  **News Articles:** Search for up to 5 recent, relevant news articles that illustrate this risk. For each article, provide its title, a very short summary, and its **full, valid, and direct URL**. It is critical that the URL is copied exactly from the search result and is not shortened, summarized, or invented.
3.  **JSON Output:** Respond ONLY with a JSON object with two keys: "legalCitations" and "newsArticles". The schema must be:
    - legalCitations: [{ "lawName": "...", "section": "...", "explanation": "..." }]
    - newsArticles: [{ "title": "...", "url": "...", "summary": "..." }]
4.  **Language:** The entire response must be in ${targetLanguage}.
5.  **No Results:** If you cannot find relevant information for a category, return an empty array for that key (e.g., "newsArticles": []). Do not invent information.

Legal Risk to Analyze: "${flagText}"`;

    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        
        let parsedResult: Partial<GroundingInfo>;
        const textResponse = response.text.trim();
        // FIX: The response may contain markdown backticks for JSON, which need to be removed before parsing.
        const jsonMatch = textResponse.match(/```json\s*([\s\S]*?)\s*```/);
        const jsonText = jsonMatch ? jsonMatch[1] : textResponse;
        
        try {
            parsedResult = JSON.parse(jsonText);
        } catch (e) {
            console.error("Failed to parse grounding response as JSON:", jsonText);
            throw new Error("The AI returned an invalid format for the real-world context. Please try again.");
        }

        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks.map(chunk => chunk.web) as GroundingInfo['sources'] || [];
        
        return { ...parsedResult, sources };

    } catch (error) {
        handleGeminiError(error);
    }
};

// --- Function for Text-to-Speech ---
export const generateSpeech = async (text: string, language: Language): Promise<string> => {
    try {
        const targetLanguage = languageMap[language] || 'English';

        // A simple heuristic to pick a voice based on language for better natural sound.
        // More voices available at: https://ai.google.dev/docs/tts/voices
        const voiceName = targetLanguage === 'Hindi' ? 'Fenrir' : 'Kore';

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Respond in ${targetLanguage}: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: voiceName },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data received from API.");
        }
        return base64Audio;
    } catch (error) {
        handleGeminiError(error);
    }
};

// --- Function for Chat ---
export const getChatResponse = async (documentText: string, analysisResult: AnalysisResult | null, history: Message[], newMessage: string, language: Language): Promise<string> => {
    try {
        const targetLanguage = languageMap[language] || 'English';
        const formattedHistory = history.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        // Remove the latest user message from history as it will be the new prompt
        const chatHistoryForApi = formattedHistory.slice(0, -1);

        const analysisContext = analysisResult && Object.keys(analysisResult).length > 0
            ? `ANALYSIS REPORT:\n---\n${JSON.stringify(analysisResult, null, 2)}\n---`
            : '';

        const chat: Chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            history: chatHistoryForApi,
            config: {
                systemInstruction: `You are a helpful AI assistant named LegalIQ.app. The user has provided a legal document and you have already performed an analysis on it. The user is now asking follow-up questions.
                - **Your most important rule is to match the user's language.** Detect the language of the user's latest query and respond in the EXACT same language and style.
                - Keep answers short, concise, and very easy to understand for a non-expert.
                - Base your answers STRICTLY on the content of the document AND the analysis provided.
                - If the answer cannot be found in the document or analysis, state that clearly in the user's language.
                - Do NOT provide legal advice. Start your response by directly answering the user's question.
                - The user's target language is ${targetLanguage}.
                
                DOCUMENT:
                ---
                ${documentText}
                ---
                
                ${analysisContext}`,
                temperature: 0.3,
            },
        });

        const response: GenerateContentResponse = await chat.sendMessage({ message: newMessage });
        
        return response.text;
    } catch (error) {
        handleGeminiError(error);
    }
};