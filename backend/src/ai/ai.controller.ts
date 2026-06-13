import { Controller, Post, Body, Get } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Controller('ai')
export class AiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('decompose-roadmap')
  async decomposeRoadmap(@Body('goal') goal: string) {
    if (!goal) {
      return { error: 'Goal parameter is required' };
    }
    const milestones = await this.geminiService.decomposeRoadmap(goal);
    return { data: milestones };
  }

  @Post('terminal-analyze')
  async terminalAnalyze(@Body('metrics') metrics: any) {
    // In a production app, we fetch actual user metrics from the Prisma database
    const telemetryData = metrics || {
      focusHours: [2.5, 3.1, 1.2, 4.0, 5.5, 0.5, 1.0],
      tasksCompleted: 42,
      variance: 'High'
    };
    
    const analysis = await this.geminiService.analyzeTerminalTelemetry(telemetryData);
    return { output: analysis };
  }
}
