import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoadmapNode, Prisma } from '@prisma/client';

@Injectable()
export class RoadmapService {
  constructor(private prisma: PrismaService) {}

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

  async getNodes() {
    const userId = await this.getDefaultUserId();
    return this.prisma.roadmapNode.findMany({
      where: { userId },
      orderBy: { order: 'asc' }
    });
  }

  async createNode(data: { title: string, description?: string, xpReward?: number, order?: number }) {
    const userId = await this.getDefaultUserId();
    return this.prisma.roadmapNode.create({
      data: {
        ...data,
        userId,
      }
    });
  }

  async updateNode(id: string, data: Partial<RoadmapNode>) {
    return this.prisma.roadmapNode.update({
      where: { id },
      data,
    });
  }

  async deleteNode(id: string) {
    return this.prisma.roadmapNode.delete({
      where: { id }
    });
  }
}
