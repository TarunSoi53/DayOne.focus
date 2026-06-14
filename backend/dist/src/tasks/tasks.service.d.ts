import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    private getDefaultUserId;
    getTasks(): Promise<({
        project: {
            id: string;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            name: string;
        } | null;
        subTasks: {
            id: string;
            title: string;
            description: string | null;
            status: string;
            isRecurringDaily: boolean;
            isAiGenerated: boolean;
            isActiveTarget: boolean;
            xpReward: number;
            completedAt: Date | null;
            reminderAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            projectId: string | null;
            parentTaskId: string | null;
        }[];
    } & {
        id: string;
        title: string;
        description: string | null;
        status: string;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        reminderAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    })[]>;
    getProjects(): Promise<({
        tasks: ({
            subTasks: {
                id: string;
                title: string;
                description: string | null;
                status: string;
                isRecurringDaily: boolean;
                isAiGenerated: boolean;
                isActiveTarget: boolean;
                xpReward: number;
                completedAt: Date | null;
                reminderAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                projectId: string | null;
                parentTaskId: string | null;
            }[];
        } & {
            id: string;
            title: string;
            description: string | null;
            status: string;
            isRecurringDaily: boolean;
            isAiGenerated: boolean;
            isActiveTarget: boolean;
            xpReward: number;
            completedAt: Date | null;
            reminderAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            projectId: string | null;
            parentTaskId: string | null;
        })[];
    } & {
        id: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        name: string;
    })[]>;
    createTask(data: {
        title: string;
        projectId?: string;
        isRecurringDaily?: boolean;
        parentTaskId?: string;
        xpReward?: number;
        reminderAt?: string;
        isAiGenerated?: boolean;
    }): Promise<{
        id: string;
        title: string;
        description: string | null;
        status: string;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        reminderAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    }>;
    updateTask(id: string, data: Partial<Task>): Promise<{
        id: string;
        title: string;
        description: string | null;
        status: string;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        reminderAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    }>;
    deleteTask(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        status: string;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        reminderAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    }>;
}
