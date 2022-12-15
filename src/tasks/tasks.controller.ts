import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.createTask(dto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
