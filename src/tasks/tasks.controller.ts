import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  Delete,
  HttpCode,
  Patch,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/common/decorators/requests/get-user.decorator';
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
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger('TasksController');

  constructor(private readonly tasksService: TasksService) {}

  // TODO create relation between user and task, so that only the user who created the task can update or delete it, and only the user who created the task can see it

  @Get()
  @ApiOperation({
    summary: 'Get all tasks',
    description:
      'Get all tasks. The seach can be filtered via query arguments "search" and "status". It is optional to provide both arguments.',
  })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'search', required: false })
  async getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `User
      "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );

    return await this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get task by ID',
    description: 'Get task by ID',
  })
  async getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    try {
      return await this.tasksService.getTaskById(id, user);
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
  async createTask(
    @Body() dto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    try {
      this.logger.verbose(
        `User "${user.username}" creating a new task. Data: ${JSON.stringify(
          dto,
        )}`,
      );

      return await this.tasksService.createTask(dto, user);
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
    @GetUser() user: User,
  ): Promise<Task> {
    try {
      return await this.tasksService.updateTaskStatus(id, status, user);
    } catch (err) {
      handleError(err);
    }
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update one task by ID',
    description:
      'Update one given task by ID. The body can contain the title, the description and the status. The status can be "OPEN", "IN_PROGRESS" or "DONE".',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateTask(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    try {
      return await this.tasksService.updateTask(id, dto, user);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete one task by ID',
    description: 'Delete one task by ID. The task will be deleted permanently.',
  })
  @ApiResponse({
    status: 204,
    description: 'Task deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    try {
      await this.tasksService.deleteTask(id, user);
    } catch (err) {
      handleError(err);
    }
  }
}
