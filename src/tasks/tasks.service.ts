import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './entities/tasks.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(id: string, dto: UpdateTaskDto): Task {
    let updatedTask: Task = this.getTaskById(id);

    updatedTask = {
      id: updatedTask.id,
      title: dto.title || updatedTask.title,
      description: dto.description || updatedTask.description,
      status: dto.status || updatedTask.status,
    };

    this.tasks = this.tasks.map((task) =>
      task.id === id ? updatedTask : task,
    );

    return updatedTask;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
