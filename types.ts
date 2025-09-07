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
}

export interface NegotiationPoint {
  point: string;
  explanation: string;
}

export interface AnalysisResult {
  documentTitle: string;
  swot: SwotAnalysis;
  redFlags: RedFlag[];
  complexityScore: number;
  summary: string;
  negotiationPoints: NegotiationPoint[];
}