import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserNameDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({
    description: 'Update the name of the signed user',
    example: 'John Doe',
  })
  name: string;
}
