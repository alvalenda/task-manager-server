import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/requests/get-user.decorator';
import { handleError } from 'src/common/helpers/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UpdateUserNameDto } from './dto/update-user-name.dto';
import { User } from './entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');

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

  @Get('/signed')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Signed user',
    description: 'Check if user is signed in. Returns user data.',
  })
  async signed(@GetUser() user: User): Promise<Partial<User>> {
    return { id: user.id, username: user.username, name: user.name };
  }

  @Patch('/update')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user name',
    description: 'Update user name.',
  })
  @ApiBody({ type: UpdateUserNameDto })
  async updateName(
    @GetUser() user: User,
    @Body('name') name: UpdateUserNameDto,
  ): Promise<Partial<User>> {
    try {
      this.logger.debug(
        `User "${user.username}" is updating name to "${name}"`,
      );

      return await this.authService.updateName(user.id, name);
    } catch (err) {
      handleError(err);
    }
  }

  @Delete()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete logged in user',
    description: 'Delete logged in user.',
  })
  async delete(@GetUser() user: User): Promise<void> {
    try {
      this.logger.debug(`User "${user.username}" is deleting account`);

      await this.authService.deleteUser(user.id);
    } catch (err) {
      handleError(err);
    }
  }
}
