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

  async createTask(data: { title: string, projectId?: string, isRecurringDaily?: boolean, parentTaskId?: string, xpReward?: number }) {
    const userId = await this.getDefaultUserId();
    return this.prisma.task.create({
      data: {
        ...data,
        userId,
      }
    });
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
