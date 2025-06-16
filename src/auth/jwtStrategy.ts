import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedError } from 'src/utils/error_thrown';
import * as moment from 'moment-timezone';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ConfigService) readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (!payload.id) {
      UnauthorizedError('Unauthorized Request', 'User id not found');
    }
    if (moment().format('X') > payload.exp) {
      UnauthorizedError('Unauthorized Request', 'Access Token Expire');
    }

    return payload;
  }
}
