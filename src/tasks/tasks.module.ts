import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskIcon } from './entities/task-icon.entity';
import { TaskStatus } from './entities/task-status.entity';
import { Task } from './entities/task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, TaskStatus, TaskIcon])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
