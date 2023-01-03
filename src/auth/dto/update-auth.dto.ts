import { PartialType } from '@nestjs/swagger';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class UpdateAuthDto extends PartialType(AuthCredentialsDto) {}
