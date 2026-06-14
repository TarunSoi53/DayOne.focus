export declare class GeminiService {
    private readonly logger;
    private getClient;
    decomposeRoadmap(goal: string, apiKey?: string): Promise<any[]>;
    analyzeTerminalTelemetry(metrics: any, apiKey?: string): Promise<string>;
    generatePredictiveTasks(metrics: any, apiKey?: string): Promise<any[]>;
    processIntent(input: string, apiKey?: string): Promise<{
        actionLog: string;
        aiSpeech: string;
    }>;
    categorizeTask(input: string, projects?: {
        id: string;
        name: string;
    }[], apiKey?: string): Promise<{
        title: string;
        isRecurringDaily: boolean;
        projectId?: string;
        isAiGenerated: boolean;
    }>;
}
