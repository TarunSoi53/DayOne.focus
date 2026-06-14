import { RoadmapService } from './roadmap.service';
export declare class RoadmapController {
    private readonly roadmapService;
    constructor(roadmapService: RoadmapService);
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
    updateNode(id: string, data: any): Promise<{
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
