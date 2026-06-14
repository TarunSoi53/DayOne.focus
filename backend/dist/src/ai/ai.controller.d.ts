import { GeminiService } from './gemini.service';
export declare class AiController {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    decomposeRoadmap(goal: string, apiKey: string): Promise<{
        error: string;
        data?: undefined;
    } | {
        data: any[];
        error?: undefined;
    }>;
    terminalAnalyze(metrics: any, apiKey: string): Promise<{
        output: string;
    }>;
    predictiveTasks(metrics: any, apiKey: string): Promise<{
        data: any[];
    }>;
    processIntent(input: string, apiKey: string): Promise<{
        error: string;
        data?: undefined;
    } | {
        data: {
            actionLog: string;
            aiSpeech: string;
        };
        error?: undefined;
    }>;
    categorizeTask(body: any, apiKey: string): Promise<{
        error: string;
        data?: undefined;
    } | {
        data: {
            title: string;
            isRecurringDaily: boolean;
            projectId?: string;
            isAiGenerated: boolean;
        };
        error?: undefined;
    }>;
}
