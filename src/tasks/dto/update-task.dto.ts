import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUppercase, Matches } from 'class-validator';
import { TaskStatus } from '../entities/tasks.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The title of the task',
    example: 'Update an existing task',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the task',
    example: 'Update an existing task with NestJS',
  })
  description?: string;

  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  @Matches(/(OPEN|IN_PROGRESS|DONE)/)
  @ApiProperty({
    description: 'The status of the task',
    example: 'IN_PROGRESS',
  })
  status?: TaskStatus;
}
