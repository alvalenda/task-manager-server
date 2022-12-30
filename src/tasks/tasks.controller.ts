import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { Delete, Patch, Query, UsePipes } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger/dist';
import { TaskStatusValidationPipe } from 'src/common/decorators/validation/task-status-validaton.pipe';
import { handleError } from 'src/common/helpers/http-exception.filter';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/tasks.entity';
import { TaskStatus } from './model/tasks-status.enum';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description:
      'Get all tasks. The seach can be filtered via query arguments "search" and "status". It is optional to provide both arguments.',
  })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
    return await this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Get task by ID',
  })
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    try {
      return await this.tasksService.getTaskById(id);
    } catch (err) {
      handleError(err);
    }
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description:
      'Create a new task with a title and a description. The status is set to "OPEN" by default.',
  })
  @UsePipes(ValidationPipe)
  async createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    try {
      return await this.tasksService.createTask(dto);
    } catch (err) {
      handleError(err);
    }
  }

  @Patch('/:id/status')
  @ApiOperation({
    summary: 'Update one task status by ID',
    description:
      'Update the status of one given task by ID. The status can be "OPEN", "IN_PROGRESS" or "DONE".',
  })
  @ApiBody({
    type: UpdateTaskStatusDto,
    enum: [TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS],
    required: true,
  })
  async updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Promise<Task> {
    try {
      return await this.tasksService.updateTaskStatus(id, status);
    } catch (err) {
      handleError(err);
    }
  }

  // @Patch('/:id')
  // @ApiOperation({
  //   summary: 'Update one task by ID',
  //   description:
  //     'Update one task by ID. The title and the description can be updated.',
  // })
  // @UsePipes(new ValidationPipe({ transform: true }))
  // updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto): Task {
  //   return this.tasksService.updateTask(id, dto);
  // }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one task by ID',
    description: 'Delete one task by ID. The task will be deleted permanently.',
  })
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.tasksService.deleteTask(id);
    } catch (err) {
      handleError(err);
    }
  }
}
