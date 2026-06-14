import { PrismaService } from '../prisma/prisma.service';
export declare class SystemService {
    private prisma;
    constructor(prisma: PrismaService);
    getLogs(): Promise<string[]>;
}
