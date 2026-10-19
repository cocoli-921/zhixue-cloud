import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { UserRole } from './enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user,
);
