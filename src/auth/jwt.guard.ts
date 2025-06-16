import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { PERMISSION_KEY } from './permission.decorator';
import { PermissionEnum } from 'src/utils/access_permissions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  canActivate(context: ExecutionContext) {
    const permission = this.reflector.getAllAndOverride<PermissionEnum[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!permission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return super.canActivate(context);
    }

    const userPermiss = request.user.permissions;

    if (!userPermiss || userPermiss.length === 0) {
      return false;
    }

    if (permission[0] === 'NO_PERMISSION') {
        return true;
    }
  

    return permission.filter((key) => userPermiss.includes(key)).length > 0;
  }
}
