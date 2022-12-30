import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { handleError } from 'src/common/helpers/http-exception.filter';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    console.log('found', found);

    if (!found)
      throw {
        name: 'NotFoundError',
        message: `Task with id ${id} not found`,
      };

    return found;
  }

  // createTask(dto: CreateTaskDto): Task {
  //   const { title, description } = dto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTaskStatus(id: string, taskStatus: TaskStatus): Task {
  //   let updatedTask: Task = this.getTaskById(id);
  //   updatedTask.status = taskStatus;
  //   return updatedTask;
  // }
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
  // deleteTask(id: string): void {
  //   const foundTask = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== foundTask.id);
  // }
}
