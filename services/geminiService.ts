import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';
import type { Language } from '../translations';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    documentTitle: {
      type: Type.STRING,
      description: "The main title or heading of the document. If no clear title is present, generate a concise and descriptive title based on the content (max 5-10 words)."
    },
    summary: {
      type: Type.STRING,
      description: "A brief, one-paragraph summary of the document's purpose and key aspects in simple, easy-to-understand language."
    },
    complexityScore: {
      type: Type.NUMBER,
      description: "A score from 1 (very simple) to 10 (highly complex and requires legal counsel)."
    },
    swot: {
      type: Type.OBJECT,
      properties: {
        strengths: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Positive aspects or clauses favorable to the primary party."
        },
        weaknesses: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Potentially unfavorable clauses, ambiguities, or omissions."
        },
        opportunities: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Areas where the document could be improved or clarified."
        },
        threats: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "Significant risks or liabilities imposed by the document."
        },
      },
      required: ["strengths", "weaknesses", "opportunities", "threats"]
    },
    redFlags: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
            flag: { type: Type.STRING, description: "A concise summary of the potential red flag." },
            explanation: { type: Type.STRING, description: "A brief explanation of why this is a potential issue." },
            citation: { type: Type.STRING, description: "The specific page number and section/subsection from the document where this red flag is located (e.g., 'Page 5, Section 3.2' or 'Page 2, Clause B'). If a precise location is not available, provide the best possible reference." },
            example: { type: Type.STRING, description: "A simple, one-sentence example that illustrates the risk in a real-world scenario. For instance: 'If the roof leaks, this clause could mean you have to pay for the entire repair yourself.'" }
        },
        required: ["flag", "explanation", "citation"]
      },
      description: "A list of common legal red flags found in the document, including citations to their location and a simple example."
    },
    negotiationPoints: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                point: { type: Type.STRING, description: "A concise summary of the point to negotiate." },
                explanation: { type: Type.STRING, description: "A brief explanation of what to ask for and why." },
                example: { type: Type.STRING, description: "A simple, one-sentence example of what the user might say or ask for. For instance: 'You could say, I would like to add a clause stating that rent will not increase by more than 3% per year.'" }
            },
            required: ["point", "explanation"]
        },
        description: "A list of actionable points the user can negotiate to improve the document's terms in their favor, each with a simple example."
    },
    jargonGlossary: {
      type: Type.ARRAY,
      description: "A comprehensive list of all technical or legal jargon terms used in the analysis (summary, SWOT, red flags, explanations). For each term, provide a very simple, one-sentence definition suitable for a non-legal user.",
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
  required: ["documentTitle", "summary", "complexityScore", "swot", "redFlags", "negotiationPoints", "jargonGlossary"]
};

const languageMap: Partial<Record<Language, string>> = {
    en: 'English',
    es: 'Spanish',
    ar: 'Arabic',
    zh: 'Chinese (Simplified)',
    hi: 'Hindi',
};

export const analyzeDocument = async (documentText: string, language: Language): Promise<AnalysisResult> => {
  const targetLanguage = languageMap[language] || 'English';
  
  const prompt = `
    Analyze the following legal document. Provide a professional-grade, detailed analysis IN ${targetLanguage}. The entire JSON output, including all strings for summaries, flags, points, SWOT items, examples, jargon, etc., must be written in ${targetLanguage}.

    Your analysis must cover these areas:
    1.  **Document Title**: Identify the main title or heading from within the document's text. If no explicit title is present, generate a concise and descriptive title (5-10 words) based on the document's content.
    2.  **Summary**: A concise summary of the document's core purpose.
    3.  **Complexity Score**: A legal complexity score on a scale of 1 to 10, where 1 is extremely simple and 10 is exceptionally complex.
    4.  **SWOT Analysis**: A SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) from the perspective of the primary party receiving the document.
    5.  **Red Flags**: A list of potential 'red flags'. For each, provide:
        a. A clear title for the flag.
        b. An explanation of the associated risk.
        c. A precise citation, including the page number and section/subsection where the flag is located in the original document (e.g., "Page 5, Section 3.2" or "Page 2, Clause B"). This is mandatory.
        d. A simple, relatable, one-sentence example that explains the risk in a real-world context for a non-legal user.
    6.  **Points to Negotiate**: A list of specific 'Points to Negotiate'. These should be actionable suggestions for improving the terms. For each point, provide:
        a. A clear title (the 'point').
        b. An 'explanation' of what to ask for and why it's beneficial.
        c. A simple, one-sentence example of what the user might say or ask for.
    7.  **Jargon Glossary**: This is a critical step. Compile a comprehensive list of ALL technical or legal jargon terms used throughout your analysis (in the summary, SWOT points, red flag explanations, and negotiation point explanations). For each term, provide a very simple, one-sentence definition that anyone can understand. The goal is to demystify complex language for the user.

    Here is the document to analyze:
    ---
    ${documentText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText) as AnalysisResult;
    
    // Ensure jargonGlossary exists to prevent crashes downstream
    if (!parsedResult.jargonGlossary) {
      parsedResult.jargonGlossary = [];
    }
    
    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Pass the specific error message from the SDK up to the UI.
        // This will give more context, e.g., "API key not valid" or permission errors.
        throw new Error(error.message);
    }
    // Fallback for non-Error objects being thrown.
    throw new Error("An unknown error occurred while communicating with the AI service.");
  }
};