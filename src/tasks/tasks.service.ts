import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.taskRepository.createQueryBuilder('task');

    if (status) query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      ); // ILIKE is case insensitive, LIKE is case sensitive

    const tasks = await query.getMany();

    return tasks;
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found)
      throw {
        name: 'NotFoundError',
        message: `Task with id '${id}' not found`,
      };

    return found;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await this.taskRepository.save(task);

    return task;
  }

  async updateTaskStatus(id: number, taskStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = taskStatus;
    await this.taskRepository.save(task);

    return task;
  }

  // updateTask(id: string, dto: UpdateTaskDto): Task {
  //   let updatedTask: Task = this.getTaskById(id);
  //   updatedTask = {
  //     id: updatedTask.id,
  //     title: dto.title || updatedTask.title,
  //     description: dto.description || updatedTask.description,
  //     status: dto.status || updatedTask.status,
  //   };
  //   this.tasks = this.tasks.map((task) =>
  //     task.id === id ? updatedTask : task,
  //   );
  //   return updatedTask;
  // }

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0)
      throw {
        name: 'NotFoundError',
        message: `Task with id '${id}' not found`,
      };
  }
}
