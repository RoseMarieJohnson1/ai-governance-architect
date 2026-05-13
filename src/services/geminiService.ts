import { GoogleGenAI, Type } from "@google/genai";
import { UserResponse, GovernanceReport } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  }

  async generateInsight(question: string, answer: string): Promise<string> {
    const prompt = `
      As an AI Governance Architect, provide a brief, professional "Architect's Insight" for the following user response in an AI governance intake process.
      Question: ${question}
      User Response: ${answer}

      Focus on flagging potential gaps or regulatory "hot spots" (e.g., GDPR, EU AI Act, biometric sensitivity). 
      Keep it concise (1-3 sentences) and authoritative.
      Do NOT use italics or bold in the response text itself.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      return response.text || "Insight could not be generated at this time.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to analyze response for insights.";
    }
  }

  async generateFinalReport(responses: UserResponse[]): Promise<GovernanceReport> {
    const context = responses.map(r => `${r.question}: ${r.answer}`).join('\n');
    const prompt = `
      As an AI Governance Architect, generate a "Governance Readiness Report" based on the following intake data:
      ${context}

      Your output must be a JSON object with the following structure:
      {
        "riskSummary": "A professional recap of the classification and overall risk posture.",
        "regulatoryMap": ["List of laws triggered by geography and use case"],
        "evidencePackChecklist": ["List of 5-7 required artifacts (e.g., ML BoM, Model Card, Impact Assessment)"],
        "initialRiskLevel": "High | Med | Low"
      }
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskSummary: { type: Type.STRING },
              regulatoryMap: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              evidencePackChecklist: { 
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              initialRiskLevel: { type: Type.STRING }
            },
            required: ["riskSummary", "regulatoryMap", "evidencePackChecklist", "initialRiskLevel"]
          }
        }
      });

      return JSON.parse(response.text || "{}") as GovernanceReport;
    } catch (error) {
      console.error("Gemini Report Error:", error);
      throw error;
    }
  }
}
