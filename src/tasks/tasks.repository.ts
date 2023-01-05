import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { User } from 'src/auth/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.enum';

// Não implementado
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) query.andWhere('task.status = :status', { status });

    if (search)
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      ); // ILIKE is case insensitive, LIKE is case sensitive

    const tasks = await query.getMany();

    tasks.forEach((task) => delete task.userId);

    return tasks;
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.findOneBy({ id, userId: user.id });

    if (!found)
      throw {
        name: 'NotFoundError',
        message: `Task with id '${id}' not found`,
      };

    return found;
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = dto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.user = user;
    task.status = TaskStatus.OPEN;

    await this.save(task);

    delete task.user;

    return task;
  }

  async updateTaskStatus(
    id: number,
    taskStatus: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = taskStatus;
    await this.save(task);

    return task;
  }

  async updateTask(id: number, dto: UpdateTaskDto, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    const { title, description, status } = dto;

    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;

    await this.save(task);

    return task;
  }

  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, userId: user.id });

    if (result.affected === 0)
      throw {
        name: 'NotFoundError',
        message: `Task with id '${id}' not found`,
      };
  }
}
