import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Error400BadRequest, Error404NotFound } from 'src/utils/error_thrown';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { SuccessDto } from 'src/utils/global/global_dto';

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

    const created = await this.userService.createDefaultUser();

    if (!created) {
      Error400BadRequest('Bad Request', 'Failed to create default user');
    }

    return created;
  }

  @Post('create')
  async createUser(@Body() body: CreateUserDto) {
    return await this.userService.createUser(body);
  }

  @Patch('edit/:id')
  async editUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<SuccessDto> {
    const user = await this.userService.getUserById(id);
    return await this.userService.updateUser({ ...user, ...body });
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<SuccessDto> {
    const user = await this.userService.getUserById(id);
    return await this.userService.deleteUser(id);
  }


}
