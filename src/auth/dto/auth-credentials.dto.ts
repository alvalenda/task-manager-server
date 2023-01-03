import { ApiProperty } from '@nestjs/swagger';
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IS_STRONG_PASSWORD,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  @ApiProperty({
    description: 'Username of the user. Must be lowercase.',
    example: 'myusername',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    description:
      'Password of the user. Must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
    example: 'MyPassword123!',
  })
  password: string;
}
