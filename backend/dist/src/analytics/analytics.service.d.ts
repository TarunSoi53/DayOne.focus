import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getDefaultUserId;
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
