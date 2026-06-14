import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RoadmapService } from './roadmap.service';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}

  @Get()
  getNodes() {
    return this.roadmapService.getNodes();
  }

  @Post()
  createNode(@Body() data: { title: string, description?: string, xpReward?: number, order?: number }) {
    return this.roadmapService.createNode(data);
  }

  @Put(':id')
  updateNode(@Param('id') id: string, @Body() data: any) {
    return this.roadmapService.updateNode(id, data);
  }

  @Delete(':id')
  deleteNode(@Param('id') id: string) {
    return this.roadmapService.deleteNode(id);
  }
}
