import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AccessLvlAllDataDto } from './access_lvl.dto';

class UserAllDataDto {
  id: string;
  access_lvl_id: string;
  name: string;
  email: string;
  theme: string;
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

class UserListReturnDto {
  data: UserAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export { UserAllDataDto, CreateUserDto, UpdateUserDto, UserListReturnDto };
