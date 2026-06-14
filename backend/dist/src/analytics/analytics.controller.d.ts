import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getWeeklyFocus(): Promise<{
        day: string;
        hours: number;
    }[]>;
    getRadarData(): Promise<{
        subject: string;
        value: number;
        fullMark: number;
    }[]>;
    getHeatmap(): Promise<number[]>;
    getStats(): Promise<{
        totalFocusTime: number;
        tasksCompleted: number;
        currentStreak: number;
        burnoutRisk: number;
        last7DaysTasks: number;
    }>;
}
