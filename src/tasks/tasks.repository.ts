import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.enum';

// Não implementado
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

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
    const found = await this.findOneBy({ id });

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

    await this.save(task);

    return task;
  }

  async updateTaskStatus(id: number, taskStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = taskStatus;
    await this.save(task);

    return task;
  }
}
