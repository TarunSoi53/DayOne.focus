import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SystemService {
  constructor(private prisma: PrismaService) {}

  async getLogs() {
    const tasks = await this.prisma.task.findMany({
      take: 10,
      orderBy: { updatedAt: 'desc' },
      where: { status: 'DONE' }
    });
    
    if (tasks.length === 0) {
      return [
        '[SYSTEM] Neural link established.',
        '[AI_ENGINE] Telemetry handshake successful.',
      ];
    }
    
    return tasks.map(t => `[TASK_SYNC] Completed objective: ${t.title}`);
  }
}
