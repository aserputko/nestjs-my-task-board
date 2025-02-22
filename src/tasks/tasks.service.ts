import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../shared/dto/pagination-query.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskIcon } from './entities/task-icon.entity';
import { TaskStatus } from './entities/task-status.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,
    @InjectRepository(TaskIcon)
    private readonly taskIconRepository: Repository<TaskIcon>,
  ) {}

  async findAll(createdBy: number, query: PaginationQueryDto) {
    const { limit, offset } = query;
    return this.taskRepository.find({
      where: { createdBy },
      relations: {
        status: true,
        icon: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number, createdBy: number) {
    const task = await this.taskRepository.findOne({
      where: { id, createdBy },
      relations: {
        status: true,
        icon: true,
      },
    });
    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return task;
  }

  async create(createdBy: number, createTaskDto: CreateTaskDto) {
    const taskStatus = await this.findOneStatuses(createTaskDto.statusId);
    const taskIcon = await this.findOneIcon(createTaskDto.iconId);

    const task = this.taskRepository.create({
      ...createTaskDto,
      status: taskStatus,
      icon: taskIcon,
      createdBy,
    });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskStatus = await this.findOneStatuses(updateTaskDto.statusId || 0);
    const taskIcon = await this.findOneIcon(updateTaskDto.iconId || 0);

    const task = await this.taskRepository.preload({
      id: +id,
      ...updateTaskDto,
      status: taskStatus,
      icon: taskIcon,
    });

    if (!task) {
      throw new NotFoundException(`Task #${id} not found`);
    }
    return this.taskRepository.save(task);
  }

  async remove(id: number) {
    const task = await this.findOne(0, id);
    return this.taskRepository.remove(task);
  }

  async findAllStatuses() {
    return this.taskStatusRepository.find();
  }

  async findOneStatuses(id: number) {
    const taskStatus = await this.taskStatusRepository.findOne({
      where: { id: +id },
    });
    if (!taskStatus) {
      throw new NotFoundException(`TaskStatus #${id} not found`);
    }
    return taskStatus;
  }

  async findAllIcons() {
    return this.taskIconRepository.find();
  }

  async findOneIcon(id: number) {
    const taskIcon = await this.taskIconRepository.findOne({
      where: { id: +id },
    });
    if (!taskIcon) {
      throw new NotFoundException(`TaskIcon #${id} not found`);
    }
    return taskIcon;
  }
}
