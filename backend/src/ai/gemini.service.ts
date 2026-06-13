import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private ai: GoogleGenAI;

  constructor() {
    try {
      // The SDK automatically picks up process.env.GEMINI_API_KEY
      this.ai = new GoogleGenAI({});
      this.logger.log('Gemini SDK initialized successfully.');
    } catch (error) {
      this.logger.warn('Gemini API Key missing or invalid. AI features will run in mock mode.', error);
    }
  }

  async decomposeRoadmap(goal: string): Promise<any[]> {
    const prompt = `
      You are an expert Computer Science mentor and senior engineer.
      Break down the following broad learning goal into a highly structured JSON array of actionable milestones.
      Goal: "${goal}"
      The response must be valid JSON matching this exact schema:
      [
        { "title": "Milestone name", "description": "Short explanation", "order": 1 }
      ]
      Do not include markdown blocks, just raw JSON.
    `;

    try {
      if (!this.ai) throw new Error('SDK not initialized');
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      return JSON.parse(response.text());
    } catch (error) {
      this.logger.error(`Failed to decompose roadmap for goal: ${goal}`, error);
      // Fallback response for dev environments without API keys
      return [
        { title: "Core Fundamentals", description: `Understand the basics of ${goal}`, order: 1 },
        { title: "Advanced Concepts", description: `Dive deep into the mechanics of ${goal}`, order: 2 },
        { title: "Final Project", description: "Build a portfolio piece", order: 3 }
      ];
    }
  }

  async analyzeTerminalTelemetry(metrics: any): Promise<string> {
    const prompt = `
      You are an omnipresent AI system terminal inside a hacker-style productivity dashboard.
      Analyze the following 7-day user telemetry data:
      ${JSON.stringify(metrics)}
      
      Provide a concise, 1-2 sentence text-based terminal log warning or optimization tip.
      Start your response exactly with "> ANALYSIS:". Keep it objective, highly technical, data-driven, and slightly brutalist. Do not use markdown.
    `;

    try {
      if (!this.ai) throw new Error('SDK not initialized');

      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text().trim();
    } catch (error) {
      this.logger.error('Failed to analyze telemetry', error);
      return '> ERROR: Telemetry analysis failed due to neural link desync. Check connection protocols.';
    }
  }
}
