import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The title of the task',
    example: 'Create a new task',
  })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'The description of the task',
    example: 'Create a new task with NestJS',
  })
  description: string;
}
