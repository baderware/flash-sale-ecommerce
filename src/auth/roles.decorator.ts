
import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/users/entities/user.entity';

//for avoiding typoos for consistency
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);