import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/common/interfaces/jwt-payload.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw {
        name: 'UnauthorizedError',
        message: 'Invalid credentials',
      };
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.signAsync(payload);

    return { accessToken };
  }
}
