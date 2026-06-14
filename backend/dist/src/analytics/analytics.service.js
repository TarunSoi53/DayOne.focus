"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getDefaultUserId() {
        const user = await this.prisma.user.findFirst();
        if (user)
            return user.id;
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
            if (today.getTime() - taskDate.getTime() < 7 * 24 * 60 * 60 * 1000) {
                const dayName = days[taskDate.getDay()];
                const dayIndex = weeklyData.findIndex(d => d.day === dayName);
                if (dayIndex !== -1) {
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
        const totalFocusTime = Math.floor(tasksCompleted * 0.5);
        let currentStreak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let currentCheckDate = new Date(today);
        const completedDates = new Set(tasks.map(t => {
            const d = new Date(t.updatedAt);
            d.setHours(0, 0, 0, 0);
            return d.getTime();
        }));
        if (completedDates.has(currentCheckDate.getTime())) {
            currentStreak++;
            currentCheckDate.setDate(currentCheckDate.getDate() - 1);
        }
        else {
            currentCheckDate.setDate(currentCheckDate.getDate() - 1);
            if (completedDates.has(currentCheckDate.getTime())) {
                currentStreak++;
                currentCheckDate.setDate(currentCheckDate.getDate() - 1);
            }
        }
        while (completedDates.has(currentCheckDate.getTime())) {
            currentStreak++;
            currentCheckDate.setDate(currentCheckDate.getDate() - 1);
        }
        const last7DaysTasks = tasks.filter(t => new Date(t.updatedAt).getTime() > today.getTime() - 7 * 24 * 60 * 60 * 1000).length;
        let burnoutRisk = 12;
        if (last7DaysTasks > 30)
            burnoutRisk = 45;
        if (last7DaysTasks > 60)
            burnoutRisk = 85;
        return {
            totalFocusTime,
            tasksCompleted,
            currentStreak,
            burnoutRisk,
            last7DaysTasks
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map