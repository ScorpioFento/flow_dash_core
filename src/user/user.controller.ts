import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { Error400BadRequest, Error404NotFound } from 'src/utils/error_thrown';
import {
  CreateUserDto,
  GetUserListDto,
  UpdateUserDto,
  UserListReturnDto,
} from './dto/user.dto';
import { SuccessDto } from 'src/utils/global/global_dto';
import {
  CreateAccessLvlDto,
  GetAccessLvlListDto,
  UpdateAccessLvlDto,
} from './dto/access_lvl.dto';
import { ACCESS_PERMISSIONS } from 'src/utils/access_permissions';

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

  @Get('list')
  async getUserList(
    @Query() query: GetUserListDto,
  ): Promise<UserListReturnDto> {
    return await this.userService.getUserList(query);
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
    return await this.userService.deleteUser(id);
  }

  @Post('access_level/create')
  async createAccessLvl(@Body() body: CreateAccessLvlDto): Promise<boolean> {
    const permissions = ACCESS_PERMISSIONS.filter((val) =>
      body.permissions.includes(val),
    );
    return await this.userService.createAccessLvl({ ...body, permissions });
  }

  @Get('access_level/list')
  async getAccessLvlList(@Query() query: GetAccessLvlListDto) {
    return await this.userService.getAccessLvlList(query);
  }

  @Patch('access_level/edit/:id')
  async editAccessLvl(
    @Body() body: UpdateAccessLvlDto,
    @Param('id') id: string,
  ): Promise<SuccessDto> {
    const accessLvl = await this.userService.getAccessLvlListById(id);
    return await this.userService.updateAccessLvl({ ...accessLvl, ...body });
  }

  @Delete('access_level/delete/:id')
  async deleteAccessLvl(@Param('id') id: string): Promise<SuccessDto> {
    return await this.userService.deleteAccessLvl(id);
  }
}
