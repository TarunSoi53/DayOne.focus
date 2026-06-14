import { PrismaService } from '../prisma/prisma.service';
import { RoadmapNode } from '@prisma/client';
export declare class RoadmapService {
    private prisma;
    constructor(prisma: PrismaService);
    private getDefaultUserId;
    getNodes(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: string;
        xpReward: number;
        userId: string;
        order: number;
    }[]>;
    createNode(data: {
        title: string;
        description?: string;
        xpReward?: number;
        order?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: string;
        xpReward: number;
        userId: string;
        order: number;
    }>;
    updateNode(id: string, data: Partial<RoadmapNode>): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: string;
        xpReward: number;
        userId: string;
        order: number;
    }>;
    deleteNode(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string | null;
        status: string;
        xpReward: number;
        userId: string;
        order: number;
    }>;
}
