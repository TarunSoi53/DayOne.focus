import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { RoadmapModule } from './roadmap/roadmap.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AiModule,
    TasksModule,
    RoadmapModule,
    AnalyticsModule,
    SystemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
