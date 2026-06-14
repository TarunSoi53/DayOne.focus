"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GeminiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = void 0;
const common_1 = require("@nestjs/common");
const genai_1 = require("@google/genai");
let GeminiService = GeminiService_1 = class GeminiService {
    logger = new common_1.Logger(GeminiService_1.name);
    getClient(apiKey) {
        if (!apiKey)
            return null;
        try {
            return new genai_1.GoogleGenAI({ apiKey });
        }
        catch (e) {
            this.logger.warn('Failed to initialize GoogleGenAI with provided key.', e);
            return null;
        }
    }
    async decomposeRoadmap(goal, apiKey) {
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
            const ai = this.getClient(apiKey);
            if (!ai)
                throw new Error('SDK not initialized or invalid API key provided');
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });
            return JSON.parse(response.text || "[]");
        }
        catch (error) {
            this.logger.error(`Failed to decompose roadmap for goal: ${goal}. Using mock data fallback.`, error);
            return [
                { title: "Core Fundamentals", description: `Understand the basics of ${goal}`, order: 1 },
                { title: "Advanced Concepts", description: `Dive deep into the mechanics of ${goal}`, order: 2 },
                { title: "Final Project", description: "Build a portfolio piece", order: 3 }
            ];
        }
    }
    async analyzeTerminalTelemetry(metrics, apiKey) {
        const prompt = `
      You are an omnipresent AI system terminal inside a hacker-style productivity dashboard.
      Analyze the following 7-day user telemetry data:
      ${JSON.stringify(metrics)}
      
      Provide a concise, 1-2 sentence text-based terminal log warning or optimization tip.
      Start your response exactly with "> ANALYSIS:". Keep it objective, highly technical, data-driven, and slightly brutalist. Do not use markdown.
    `;
        try {
            const ai = this.getClient(apiKey);
            if (!ai)
                throw new Error('SDK not initialized or invalid API key provided');
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            return (response.text || "").trim();
        }
        catch (error) {
            this.logger.error('Failed to analyze telemetry. Using mock fallback.', error);
            return '> ERROR: Telemetry analysis failed due to neural link desync. Provide a valid x-ai-api-key header.';
        }
    }
    async generatePredictiveTasks(metrics, apiKey) {
        const prompt = `
      You are a behavioral optimization AI. 
      Analyze the following 7-14 day user telemetry:
      ${JSON.stringify(metrics)}
      
      Determine where performance is slipping or where the user is ready for progressive adaptation.
      Generate 2-3 specific, actionable optimization tasks. 
      The response must be a JSON array matching this exact schema:
      [
        { "title": "Task title", "description": "Why this helps", "isAiGenerated": true, "xpReward": 50 }
      ]
      Do not include markdown blocks, just raw JSON.
    `;
        try {
            const ai = this.getClient(apiKey);
            if (!ai)
                throw new Error('SDK not initialized or invalid API key provided');
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });
            return JSON.parse(response.text || "[]");
        }
        catch (error) {
            this.logger.error('Failed to generate predictive tasks. Using mock fallback.', error);
            return [
                { title: "Increase morning step target to 15,000", description: "You've hit 14,000 steps 7 days in a row.", isAiGenerated: true, xpReward: 50 },
                { title: "Schedule 90m deep work block", description: "Project completion rate has dropped by 10%.", isAiGenerated: true, xpReward: 150 }
            ];
        }
    }
    async processIntent(input, apiKey) {
        const prompt = `
      You are the backend AI for DayOne.Focus, a hacker-style productivity OS.
      The user just typed this command in the system shell: "${input}"
      
      Determine what action they are trying to take. Return a JSON object with two fields:
      - actionLog: A brutalist system log describing what database/system change you are making (e.g., "[Database Write] -> Injected new task vector"). Use bright green [System State] tags if needed.
      - aiSpeech: What you, the AI agent, say back to the user in a cold, professional, but helpful tone.
      
      Respond ONLY with valid JSON.
      { "actionLog": "...", "aiSpeech": "..." }
    `;
        try {
            const ai = this.getClient(apiKey);
            if (!ai)
                throw new Error('SDK not initialized or invalid API key provided');
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                }
            });
            return JSON.parse(response.text || "{}");
        }
        catch (error) {
            this.logger.error('Failed to process intent. Using mock fallback.', error);
            return {
                actionLog: '[Behavioral Engine] -> Fallback parser engaged. Cannot reach neural core without valid x-ai-api-key.',
                aiSpeech: `I received your intent: "${input}". However, my connection to the Gemini core is severed. Please provide a valid API key in the settings.`
            };
        }
    }
};
exports.GeminiService = GeminiService;
exports.GeminiService = GeminiService = GeminiService_1 = __decorate([
    (0, common_1.Injectable)()
], GeminiService);
//# sourceMappingURL=gemini.service.js.map