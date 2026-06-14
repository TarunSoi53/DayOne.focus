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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("./gemini.service");
let AiController = class AiController {
    geminiService;
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async decomposeRoadmap(goal, apiKey) {
        if (!goal) {
            return { error: 'Goal parameter is required' };
        }
        const milestones = await this.geminiService.decomposeRoadmap(goal, apiKey);
        return { data: milestones };
    }
    async terminalAnalyze(metrics, apiKey) {
        if (!metrics) {
            return { output: '> ERROR: No telemetry data provided. Stats endpoint may be offline.' };
        }
        const analysis = await this.geminiService.analyzeTerminalTelemetry(metrics, apiKey);
        return { output: analysis };
    }
    async predictiveTasks(metrics, apiKey) {
        if (!metrics) {
            return { data: [] };
        }
        const tasks = await this.geminiService.generatePredictiveTasks(metrics, apiKey);
        return { data: tasks };
    }
    async processIntent(input, apiKey) {
        if (!input) {
            return { error: 'Input parameter is required' };
        }
        const result = await this.geminiService.processIntent(input, apiKey);
        return { data: result };
    }
    async categorizeTask(body, apiKey) {
        if (!body.input) {
            return { error: 'Input parameter is required' };
        }
        const result = await this.geminiService.categorizeTask(body.input, body.projects, apiKey);
        return { data: result };
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Post)('decompose-roadmap'),
    __param(0, (0, common_1.Body)('goal')),
    __param(1, (0, common_1.Headers)('x-ai-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "decomposeRoadmap", null);
__decorate([
    (0, common_1.Post)('terminal-analyze'),
    __param(0, (0, common_1.Body)('metrics')),
    __param(1, (0, common_1.Headers)('x-ai-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "terminalAnalyze", null);
__decorate([
    (0, common_1.Post)('predictive-tasks'),
    __param(0, (0, common_1.Body)('metrics')),
    __param(1, (0, common_1.Headers)('x-ai-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "predictiveTasks", null);
__decorate([
    (0, common_1.Post)('process-intent'),
    __param(0, (0, common_1.Body)('input')),
    __param(1, (0, common_1.Headers)('x-ai-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "processIntent", null);
__decorate([
    (0, common_1.Post)('categorize-task'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-ai-api-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "categorizeTask", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], AiController);
//# sourceMappingURL=ai.controller.js.map