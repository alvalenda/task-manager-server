import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../model/tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  @ApiProperty({
    description: 'Filter results by status',
    enum: [TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN],
    required: false,
  })
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Filter results by term',
    required: false,
  })
  search?: string;
}
