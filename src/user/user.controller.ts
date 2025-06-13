import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Error400BadRequest, Error404NotFound } from 'src/utils/error_thrown';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('default_user/:secret_key')
  async createDefaultUser(
    @Param('secret_key') secret_key: string,
  ): Promise<boolean> {
    const secretKey = this.configService.get<string>('DEFAULT_USER_SECRET_KEY');
    if (secret_key !== secretKey) {
      Error404NotFound('Bad Request', 'Secret Key Not Match');
    }

    const result = await this.userService.createDefaultUser();

    if (!result) {
      Error400BadRequest('Bad Request', 'Failed to create default user');
    }

    return result;
  }
}
