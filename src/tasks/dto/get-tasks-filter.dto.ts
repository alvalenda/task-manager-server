import { IsIn, IsOptional } from 'class-validator';
import { IsNotEmpty } from 'class-validator/types/decorator/decorators';
import { TaskStatus } from '../entities/tasks.entity';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status?: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
