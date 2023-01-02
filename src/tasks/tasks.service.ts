import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const tasks = await this.taskRepository.getTasks(filterDto);

    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.getTaskById(id);

    return found;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskRepository.createTask(dto);

    return newTask;
  }

  async updateTaskStatus(id: number, taskStatus: TaskStatus): Promise<Task> {
    const updatedTask = await this.taskRepository.updateTaskStatus(
      id,
      taskStatus,
    );

    return updatedTask;
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    const { title, description, status } = dto;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await this.taskRepository.save(task);

    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0)
      throw {
        name: 'NotFoundError',
        message: `Task with id '${id}' not found`,
      };
  }
}
