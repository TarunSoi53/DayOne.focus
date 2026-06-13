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
    const telemetryData = metrics || {
      focusHours: [2.5, 3.1, 1.2, 4.0, 5.5, 0.5, 1.0],
      tasksCompleted: 42,
      variance: 'High'
    };
    
    const analysis = await this.geminiService.analyzeTerminalTelemetry(telemetryData, apiKey);
    return { output: analysis };
  }

  @Post('predictive-tasks')
  async predictiveTasks(@Body('metrics') metrics: any, @Headers('x-ai-api-key') apiKey: string) {
    const telemetryData = metrics || {
      habitConsistency: 'High (14k steps consistently met)',
      focusTimings: 'Dropping in afternoon blocks',
      projectCompletion: 'Stalling on Authentication Refactor'
    };

    const tasks = await this.geminiService.generatePredictiveTasks(telemetryData, apiKey);
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
}
