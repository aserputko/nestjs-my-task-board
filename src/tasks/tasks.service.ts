import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toSkillOption } from 'src/shared/dto/pagination.dto';
import { FindOptionsRelations, Like, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskIcon } from './entities/task-icon.entity';
import { TaskStatus } from './entities/task-status.entity';
import { Task } from './entities/task.entity';

type activeUserId = FindOptionsRelations<User>;
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(TaskStatus)
    private readonly taskStatusRepository: Repository<TaskStatus>,
    @InjectRepository(TaskIcon)
    private readonly taskIconRepository: Repository<TaskIcon>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(userId: number, query: GetTasksDto) {
    const { pageSize, pageNumber, search, orderBy, orderDirection } = query;

    const count = await this.taskRepository.count();
    const tasks = await this.taskRepository.find({
      where: { user: { id: userId }, name: Like(`%${search || ''}%`) },
      relations: {
        status: true,
        icon: true,
      },
      skip: toSkillOption(pageNumber, pageSize),
      take: pageSize,
      order: {
        [orderBy || 'id']: orderDirection || 'ASC',
      },
    });

    return { count, tasks };
  }

  async findOne(id: number, userId: number) {
    const task = await this.taskRepository.findOne({
      where: { id, user: { id: userId } },
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

  async create(userId: number, createTaskDto: CreateTaskDto) {
    const taskStatus = await this.findOneStatus(createTaskDto.statusId);
    const taskIcon = await this.findOneIcon(createTaskDto.iconId);
    const user = await this.findOneUser(userId);

    const task = this.taskRepository.create({
      ...createTaskDto,
      status: taskStatus,
      icon: taskIcon,
      user,
    });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskStatus = await this.findOneStatus(updateTaskDto.statusId || 0);
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

  async findOneStatus(id: number) {
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

  async findOneUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
}
