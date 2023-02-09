import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { IsIn, IsOptional } from 'class-validator';
import { TaskStatus } from '../model/tasks-status.enum';

export class UpdateTaskStatusDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  @ApiProperty({
    description: 'Update the status of one given task by ID',
    enum: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE],
    required: true,
  })
  status: TaskStatus;
}
