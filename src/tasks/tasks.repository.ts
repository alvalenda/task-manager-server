import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DataSource, Repository } from 'typeorm';
import { Task } from './entities/tasks.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  // async createTask(task: Task): Promise<Task> {
  //   return await this.save(task);
  // }

  // async getTasks(): Promise<Task[]> {
  //   return await this.find();
  // }

  // async getTaskById(id: number): Promise<Task> {
  //   return await this.findOne({ where: { id } });
  // }

  // async deleteTask(id: number): Promise<void> {
  //   await this.delete(id);
  // }

  // async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
  //   const task = await this.getTaskById(id);
  //   task.status = status;
  //   await this.save(task);

  //   return task;
  // }
}
