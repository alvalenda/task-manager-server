import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.enum';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDto, user);

    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id, user);

    return found;
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = await this.taskRepository.createTask(dto, user);

    return newTask;
  }

  async updateTaskStatus(
    id: number,
    taskStatus: TaskStatus,
    user: User,
  ): Promise<Task> {
    const updatedTask = await this.taskRepository.updateTaskStatus(
      id,
      taskStatus,
      user,
    );

    return updatedTask;
  }

  async updateTask(id: number, dto: UpdateTaskDto, user: User): Promise<Task> {
    const updatedTask = await this.taskRepository.updateTask(id, dto, user);

    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.deleteTask(id);
  }
}
