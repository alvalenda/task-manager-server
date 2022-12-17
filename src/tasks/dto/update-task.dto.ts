import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUppercase, Matches } from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @Matches(/(OPEN|IN_PROGRESS|DONE)/)
  status?: TaskStatus;
}
