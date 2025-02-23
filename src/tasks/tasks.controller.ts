import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ActiveUserId } from 'src/auth/auth-active-user-id.decorator';
import { PaginationResultDto, toPaginationResult } from 'src/shared/dto/pagination.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';

@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll(
    @ActiveUserId() createdBy: number,
    @Query() query: GetTasksDto,
  ): Promise<PaginationResultDto<Task>> {
    const { tasks, count } = await this.tasksService.findAll(createdBy, query);
    return toPaginationResult(tasks, count, query.pageSize, query.pageNumber);
  }

  @Get('icons')
  findAllTaskIcons() {
    return this.tasksService.findAllIcons();
  }

  @Get('statuses')
  findAllTaskStatuses() {
    return this.tasksService.findAllStatuses();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUserId() createdBy: number) {
    return this.tasksService.findOne(+id, createdBy);
  }

  @Post()
  create(@ActiveUserId() userId: number, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(userId, createTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
