export interface SwotAnalysis {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RedFlag {
  flag: string;
  explanation: string;
  citation: string;
  example?: string;
}

export interface NegotiationPoint {
  point: string;
  explanation: string;
  example?: string;
}

export interface JargonTerm {
  term: string;
  definition: string;
}

export interface LegalCitation {
  lawName: string;
  section: string;
  explanation: string;
}

export interface NewsArticle {
  title: string;
  url: string;
  summary: string;
}

export interface GroundingSource {
    web: {
      uri: string;
      title: string;
    }
}

export interface GroundingInfo {
  legalCitations?: LegalCitation[];
  newsArticles?: NewsArticle[];
  sources?: GroundingSource[];
}

export interface AnalysisResult {
  documentTitle?: string;
  swot?: SwotAnalysis;
  redFlags?: RedFlag[];
  complexityScore?: number;
  summary?: string;
  negotiationPoints?: NegotiationPoint[];
  jargonGlossary?: JargonTerm[];
}

// Add a type for section-specific errors
export type SectionError = {
    section: keyof AnalysisResult;
    message: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}