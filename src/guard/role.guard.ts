import { CanActivate, ExecutionContext, Injectable, ForbiddenException  } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('No user info');

    if (!this.allowedRoles.includes(user.role)) {
      throw new ForbiddenException('Forbidden');
    }
    return true;
  }
}
