import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallBack: true,
    });
  }

  async validate(email: string, password: string): Promise<LoginDto> {
    return this.authService.Login({ email, password });
  }
}
