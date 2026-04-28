import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../users/entities/user.entity';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    //  What roles are required for this specific route?
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, we let them through
    if (!requiredRoles) return true;

    //  Get the user from the request --attached by JwtAuthGuard--
    const { user } = context.switchToHttp().getRequest();

    // Check if the user has the required role
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const hasRole = requiredRoles.some((role) => user.role?.includes(role));
    
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission to access this resource');
    }
    
    return true;
  }
}