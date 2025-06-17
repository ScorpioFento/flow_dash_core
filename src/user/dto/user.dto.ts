import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AccessLvlAllDataDto } from './access_lvl.dto';
import { OrderTypeEnum } from 'src/utils/enums';

class UserAllDataDto {
  id: string;
  access_lvl_id: string;
  name: string;
  email: string;
  theme: string;
  ui_size : string;
  created_at: Date;
  updated_at: Date;
  access_permissions: AccessLvlAllDataDto;
}
  
class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsString()
  access_lvl_id: string;
}

class UpdateUserDto extends PartialType(CreateUserDto) {}


class GetUserListDto {
  @IsNotEmpty()
  page_number : number;

  @IsNotEmpty()
  per_page : number;

  order_by : string;
  order_type : OrderTypeEnum;
}

class UserListReturnDto {
  data: UserAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export { UserAllDataDto, CreateUserDto, UpdateUserDto, GetUserListDto, UserListReturnDto };
