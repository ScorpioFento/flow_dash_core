import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { OrderTypeEnum } from 'src/utils/enums';

class AccessLvlAllDataDto {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  created_at: Date;
  updated_at: Date;
}

class CreateAccessLvlDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsArray({ each: true })
  permissions: string[];
}

class UpdateAccessLvlDto extends PartialType(CreateAccessLvlDto) {}

class GetAccessLvlListDto {
  @IsNotEmpty()
  page_number : number;

  @IsNotEmpty()
  per_page : number;

  order_by : string;
  order_type : OrderTypeEnum;
}

class AccessLvlListReturnDto {
  data: AccessLvlAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export {
  AccessLvlAllDataDto,
  CreateAccessLvlDto,
  UpdateAccessLvlDto,
  GetAccessLvlListDto,
  AccessLvlListReturnDto,
};
