import { Injectable } from '@nestjs/common';
import { Task } from './entities/tasks.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
}
