import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    private getDefaultUserId;
    getTasks(): Promise<({
        project: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            userId: string;
        } | null;
        subTasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.TaskStatus;
            isRecurringDaily: boolean;
            isAiGenerated: boolean;
            isActiveTarget: boolean;
            xpReward: number;
            completedAt: Date | null;
            userId: string;
            projectId: string | null;
            parentTaskId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    })[]>;
    getProjects(): Promise<({
        tasks: ({
            subTasks: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string | null;
                status: import(".prisma/client").$Enums.TaskStatus;
                isRecurringDaily: boolean;
                isAiGenerated: boolean;
                isActiveTarget: boolean;
                xpReward: number;
                completedAt: Date | null;
                userId: string;
                projectId: string | null;
                parentTaskId: string | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string | null;
            status: import(".prisma/client").$Enums.TaskStatus;
            isRecurringDaily: boolean;
            isAiGenerated: boolean;
            isActiveTarget: boolean;
            xpReward: number;
            completedAt: Date | null;
            userId: string;
            projectId: string | null;
            parentTaskId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        userId: string;
    })[]>;
    createTask(data: {
        title: string;
        projectId?: string;
        isRecurringDaily?: boolean;
        parentTaskId?: string;
        xpReward?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    }>;
    updateTask(id: string, data: Partial<Task>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    }>;
    deleteTask(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.TaskStatus;
        isRecurringDaily: boolean;
        isAiGenerated: boolean;
        isActiveTarget: boolean;
        xpReward: number;
        completedAt: Date | null;
        userId: string;
        projectId: string | null;
        parentTaskId: string | null;
    }>;
}
