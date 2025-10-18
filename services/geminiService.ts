import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult, SwotAnalysis, RedFlag, NegotiationPoint, JargonTerm } from '../types';
import type { Language } from '../translations';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const languageMap: Partial<Record<Language, string>> = {
    en: 'English',
    es: 'Spanish',
    ar: 'Arabic',
    zh: 'Chinese (Simplified)',
    hi: 'Hindi',
};

// Generic function to handle API calls and errors
async function generateContentWithSchema<T>(prompt: string, schema: any): Promise<T> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                temperature: 0.2,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as T;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while communicating with the AI service.");
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