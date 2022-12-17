import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Delete, Patch, Query, UsePipes } from '@nestjs/common/decorators';
import { TaskStatusValidationPipe } from 'src/common/decorators/validation/task-status-validaton.pipe';
import { handleError } from 'src/common/helpers/http-exception.filter';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/tasks.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() dto: CreateTaskDto): Task {
    try {
      return this.tasksService.createTask(dto);
    } catch (err) {
      handleError(err);
    }
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) taskStatus: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, taskStatus);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }
}
