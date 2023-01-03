import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({
    description: 'Username of the user',
    example: 'myusername',
  })
  username: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'mypassword',
  })
  password: string;
}
