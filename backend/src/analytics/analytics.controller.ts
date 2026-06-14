import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('weekly')
  getWeeklyFocus() {
    return this.analyticsService.getWeeklyFocus();
  }

  @Get('radar')
  getRadarData() {
    return this.analyticsService.getRadarData();
  }

  @Get('heatmap')
  getHeatmap() {
    return this.analyticsService.getHeatmap();
  }

  @Get('stats')
  getStats() {
    return this.analyticsService.getStats();
  }
}
