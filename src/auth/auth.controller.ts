import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginReturnDto } from './dto/auth.dto';
import { UserAuthGuard } from './user.guard';

@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(UserAuthGuard)
  @Post('user')
  async userLogin(@Request() req : any): Promise<LoginReturnDto> {
    const {user} = req;
    return await this.authService.userJwt(user);
  }
}
