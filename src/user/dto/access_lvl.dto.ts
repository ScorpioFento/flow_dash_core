import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

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

class AccessLvlListReturn {
  data: AccessLvlAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export {
  AccessLvlAllDataDto,
  CreateAccessLvlDto,
  UpdateAccessLvlDto,
  AccessLvlListReturn,
};
