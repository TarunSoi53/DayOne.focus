import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Helper to get or create a default user for local dev
  private async getDefaultUserId(): Promise<string> {
    const user = await this.prisma.user.findFirst();
    if (user) return user.id;

    const newUser = await this.prisma.user.create({
      data: {
        email: 'hacker@dayone.focus',
        username: 'hacker',
        passwordHash: 'dummy',
      }
    });
    return newUser.id;
  }

  async getTasks() {
    const userId = await this.getDefaultUserId();

    // Daily Quest Regeneration Logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const oldDailies = await this.prisma.task.findMany({
      where: {
        userId,
        isRecurringDaily: true,
        status: 'DONE',
        updatedAt: { lt: today }
      }
    });

    for (const oldDaily of oldDailies) {
      // 1. Mark old one as not recurring anymore so it becomes just historical
      await this.prisma.task.update({
        where: { id: oldDaily.id },
        data: { isRecurringDaily: false }
      });

      // 2. Clone a fresh one for today
      await this.prisma.task.create({
        data: {
          title: oldDaily.title,
          description: oldDaily.description,
          userId: oldDaily.userId,
          isRecurringDaily: true,
          status: 'TODO',
          xpReward: oldDaily.xpReward,
          isAiGenerated: oldDaily.isAiGenerated,
          projectId: oldDaily.projectId
        }
      });
    }

    return this.prisma.task.findMany({
      where: { userId },
      include: {
        subTasks: true,
        project: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getProjects() {
    const userId = await this.getDefaultUserId();
    return this.prisma.project.findMany({
      where: { userId },
      include: {
        tasks: {
          where: { parentTaskId: null },
          include: { subTasks: true }
        }
      }
    });
  }

  async createTask(data: { title: string, projectId?: string, isRecurringDaily?: boolean, parentTaskId?: string, xpReward?: number, reminderAt?: string, isAiGenerated?: boolean }) {
    const userId = await this.getDefaultUserId();
    const taskData: any = {
      title: data.title,
      userId,
      projectId: data.projectId || undefined,
      isRecurringDaily: data.isRecurringDaily || false,
      parentTaskId: data.parentTaskId || undefined,
      xpReward: data.xpReward || 10,
      isAiGenerated: data.isAiGenerated || false,
    };
    if (data.reminderAt) {
      taskData.reminderAt = new Date(data.reminderAt);
    }
    return this.prisma.task.create({ data: taskData });
  }

  async updateTask(id: string, data: Partial<Task>) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: string) {
    return this.prisma.task.delete({
      where: { id }
    });
  }
}
