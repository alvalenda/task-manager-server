import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.model';

// Não implementado
@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description } = dto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await TaskRepository.prototype.save(task);

    return task;
  }
}
