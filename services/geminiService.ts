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
            citation: { type: Type.STRING, description: "The specific page number and section/subsection from the document where this red flag is located (e.g., 'Page 5, Section 3.2' or 'Page 2, Clause B'). If a precise location is not available, provide the best possible reference." }
        },
        required: ["flag", "explanation", "citation"]
      },
      description: "A list of common legal red flags found in the document, including citations to their location."
    },
    negotiationPoints: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                point: { type: Type.STRING, description: "A concise summary of the point to negotiate." },
                explanation: { type: Type.STRING, description: "A brief explanation of what to ask for and why." }
            },
            required: ["point", "explanation"]
        },
        description: "A list of actionable points the user can negotiate to improve the document's terms in their favor."
    }
  },
  required: ["documentTitle", "summary", "complexityScore", "swot", "redFlags", "negotiationPoints"]
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
    Analyze the following legal document. Provide a professional-grade, detailed analysis IN ${targetLanguage}. The entire JSON output, including all strings for summaries, flags, points, SWOT items, etc., must be written in ${targetLanguage}.

    Your analysis must cover these areas:
    1.  **Document Title**: Identify the main title or heading from within the document's text. If no explicit title is present, generate a concise and descriptive title (5-10 words) based on the document's content.
    2.  **Summary**: A concise summary of the document's core purpose.
    3.  **Complexity Score**: A legal complexity score on a scale of 1 to 10, where 1 is extremely simple and 10 is exceptionally complex.
    4.  **SWOT Analysis**: A SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) from the perspective of the primary party receiving the document.
    5.  **Red Flags**: A list of potential 'red flags'. For each, provide:
        a. A clear title for the flag.
        b. An explanation of the associated risk.
        c. A precise citation, including the page number and section/subsection where the flag is located in the original document (e.g., "Page 5, Section 3.2" or "Page 2, Clause B"). This is mandatory.
    6.  **Points to Negotiate**: A list of specific 'Points to Negotiate'. These should be actionable suggestions for improving the terms. For each point, provide a clear title (the 'point') and an 'explanation' of what to ask for and why it's beneficial.

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
    return parsedResult;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. The model may have returned an invalid format or an error occurred.");
  }
};