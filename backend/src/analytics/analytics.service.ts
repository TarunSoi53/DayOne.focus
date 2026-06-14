import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
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

  async getWeeklyFocus() {
    const userId = await this.getDefaultUserId();
    const tasks = await this.prisma.task.findMany({
      where: { userId, status: 'DONE' }
    });

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const weeklyData = days.map(day => ({ day, hours: 0 }));

    tasks.forEach(task => {
      const taskDate = new Date(task.updatedAt);
      // Only count tasks from the last 7 days
      if (today.getTime() - taskDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
        const dayName = days[taskDate.getDay()];
        const dayIndex = weeklyData.findIndex(d => d.day === dayName);
        if (dayIndex !== -1) {
          // Assume each task gives 0.5 hours of focus time for now
          weeklyData[dayIndex].hours += 0.5;
        }
      }
    });

    return weeklyData;
  }

  async getRadarData() {
    const userId = await this.getDefaultUserId();
    const projects = await this.prisma.project.findMany({ where: { userId }, include: { tasks: true } });
    if (projects.length === 0) {
      return [];
    }
    
    return projects.map(p => {
      const completed = p.tasks.filter(t => t.status === 'DONE').length;
      const total = p.tasks.length || 1;
      return {
        subject: p.name.substring(0, 10),
        value: Math.floor((completed / total) * 100),
        fullMark: 100
      };
    });
  }

  async getHeatmap() {
    const userId = await this.getDefaultUserId();
    const tasks = await this.prisma.task.findMany({
      where: { userId, status: 'DONE' }
    });

    // Return last 365 days of activity
    const activityMap = new Array(365).fill(0);
    const today = new Date();

    tasks.forEach(task => {
      const taskDate = new Date(task.updatedAt);
      const diffTime = Math.abs(today.getTime() - taskDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 365) {
        activityMap[364 - diffDays] += 1;
      }
    });

    return activityMap.map(count => Math.min(count, 4));
  }

  async getStats() {
    const userId = await this.getDefaultUserId();
    const tasks = await this.prisma.task.findMany({
      where: { userId, status: 'DONE' },
      orderBy: { updatedAt: 'desc' }
    });

    const tasksCompleted = tasks.length;
    const totalFocusTime = Math.floor(tasksCompleted * 0.5); // Estimate 30m per task

    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate streak
    let currentCheckDate = new Date(today);
    
    // Group tasks by date string
    const completedDates = new Set(tasks.map(t => {
      const d = new Date(t.updatedAt);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }));

    // Check if they did something today
    if (completedDates.has(currentCheckDate.getTime())) {
      currentStreak++;
      currentCheckDate.setDate(currentCheckDate.getDate() - 1);
    } else {
      // Maybe they haven't done anything today but they did yesterday, so streak is still alive from yesterday
      currentCheckDate.setDate(currentCheckDate.getDate() - 1);
      if (completedDates.has(currentCheckDate.getTime())) {
        currentStreak++;
        currentCheckDate.setDate(currentCheckDate.getDate() - 1);
      }
    }

    // Keep going backwards
    while (completedDates.has(currentCheckDate.getTime())) {
      currentStreak++;
      currentCheckDate.setDate(currentCheckDate.getDate() - 1);
    }

    // Burnout risk: if they have done a ton of tasks in the last 7 days vs previous 7 days
    const last7DaysTasks = tasks.filter(t => new Date(t.updatedAt).getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000).length;
    let burnoutRisk = 12; // Base optimal
    if (last7DaysTasks > 30) burnoutRisk = 45; // Medium
    if (last7DaysTasks > 60) burnoutRisk = 85; // High

    return {
      totalFocusTime,
      tasksCompleted,
      currentStreak,
      burnoutRisk,
      last7DaysTasks
    };
  }
}
