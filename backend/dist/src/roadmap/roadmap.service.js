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
exports.RoadmapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RoadmapService = class RoadmapService {
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
    async getNodes() {
        const userId = await this.getDefaultUserId();
        return this.prisma.roadmapNode.findMany({
            where: { userId },
            orderBy: { order: 'asc' }
        });
    }
    async createNode(data) {
        const userId = await this.getDefaultUserId();
        return this.prisma.roadmapNode.create({
            data: {
                ...data,
                userId,
            }
        });
    }
    async updateNode(id, data) {
        return this.prisma.roadmapNode.update({
            where: { id },
            data,
        });
    }
    async deleteNode(id) {
        return this.prisma.roadmapNode.delete({
            where: { id }
        });
    }
};
exports.RoadmapService = RoadmapService;
exports.RoadmapService = RoadmapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoadmapService);
//# sourceMappingURL=roadmap.service.js.map