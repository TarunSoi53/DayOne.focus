import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Get('projects')
  getProjects() {
    return this.tasksService.getProjects();
  }

  @Post()
  createTask(@Body() data: { title: string, projectId?: string, isRecurringDaily?: boolean, parentTaskId?: string, xpReward?: number, reminderAt?: string, isAiGenerated?: boolean }) {
    return this.tasksService.createTask(data);
  }

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() data: any) {
    return this.tasksService.updateTask(id, data);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }
}
