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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TasksService = class TasksService {
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
    async getTasks() {
        const userId = await this.getDefaultUserId();
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
            await this.prisma.task.update({
                where: { id: oldDaily.id },
                data: { isRecurringDaily: false }
            });
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
    async createTask(data) {
        const userId = await this.getDefaultUserId();
        const taskData = {
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
    async updateTask(id, data) {
        return this.prisma.task.update({
            where: { id },
            data,
        });
    }
    async deleteTask(id) {
        return this.prisma.task.delete({
            where: { id }
        });
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map