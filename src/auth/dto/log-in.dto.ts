import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// This creates a safe, separate LoginDto that only contains name and password
export class LoginDto extends PickType(CreateUserDto, [
  'name',
  'password',
] as const) {}