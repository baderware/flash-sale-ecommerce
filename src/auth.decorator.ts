// auth.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './auth/roles.decorator'; 
import { UserRole } from 'src/users/entities/user.entity';
//to avoid reptitve stuffs i just wrote this
export function Auth(...allowedRoles: UserRole[]) {
  return applyDecorators(
    Roles(...allowedRoles),              // 1. Mark the route with specific roles
    UseGuards(JwtAuthGuard, RolesGuard), // 2. Run both "Who are you?" and "Can you do this?"
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({ description: 'Forbidden: You do not have the right role' }),
  );
}