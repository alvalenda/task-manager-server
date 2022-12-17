import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
