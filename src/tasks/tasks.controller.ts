import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.tasksService.findAll(query);
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
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
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
