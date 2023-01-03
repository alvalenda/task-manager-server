import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';

// Não implementado
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.password = password;

    await this.save(user);
  }
}
