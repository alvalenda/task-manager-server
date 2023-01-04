import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { handleError } from 'src/common/helpers/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up',
    description:
      'Sign up a new user with username and password credentials. Username must be lowercase. Password must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
  })
  async signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    try {
      return await this.authService.signUp(authCredentialsDto);
    } catch (err) {
      handleError(err);
    }
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'Sign in',
    description: 'Sign in with username and password credentials.',
  })
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    try {
      return await this.authService.signIn(authCredentialsDto);
    } catch (err) {
      handleError(err);
    }
  }
}
