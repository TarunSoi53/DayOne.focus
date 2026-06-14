import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('ai')
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('decompose-roadmap')
  async decomposeRoadmap(@Body('goal') goal: string, @Headers('x-ai-api-key') apiKey: string) {
    if (!goal) {
      return { error: 'Goal parameter is required' };
    }
    const milestones = await this.geminiService.decomposeRoadmap(goal, apiKey);
    return { data: milestones };
  }

  @Post('terminal-analyze')
  async terminalAnalyze(@Body('metrics') metrics: any, @Headers('x-ai-api-key') apiKey: string) {
    if (!metrics) {
      return { output: '> ERROR: No telemetry data provided. Stats endpoint may be offline.' };
    }
    const analysis = await this.geminiService.analyzeTerminalTelemetry(metrics, apiKey);
    return { output: analysis };
  }

  @Post('predictive-tasks')
  async predictiveTasks(@Body('metrics') metrics: any, @Headers('x-ai-api-key') apiKey: string) {
    if (!metrics) {
      return { data: [] };
    }
    const tasks = await this.geminiService.generatePredictiveTasks(metrics, apiKey);
    return { data: tasks };
  }

  @Post('process-intent')
  async processIntent(@Body('input') input: string, @Headers('x-ai-api-key') apiKey: string) {
    if (!input) {
      return { error: 'Input parameter is required' };
    }
    const result = await this.geminiService.processIntent(input, apiKey);
    return { data: result };
  }

  @Post('categorize-task')
  async categorizeTask(@Body() body: any, @Headers('x-ai-api-key') apiKey: string) {
    if (!body.input) {
      return { error: 'Input parameter is required' };
    }
    const result = await this.geminiService.categorizeTask(body.input, body.projects, apiKey);
    return { data: result };
  }
}
