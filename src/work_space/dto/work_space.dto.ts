import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserAllDataDto } from 'src/user/dto/user.dto';
import { OrderTypeEnum } from 'src/utils/enums';

class WorkSpaceAllDataDto {
  id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  user : UserAllDataDto;
}

class CreateWorkSpaceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}

class UpdateWorkSpaceDto extends PartialType(CreateWorkSpaceDto) {}

class GetWorkSpaceListDto {
  @IsNotEmpty()
  page_number: number;

  @IsNotEmpty()
  per_page: number;

  order_by: string;
  order_type: OrderTypeEnum;
}

class WorkSpaceListReturnDto {
  data: WorkSpaceAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export {
  WorkSpaceAllDataDto,
  CreateWorkSpaceDto,
  UpdateWorkSpaceDto,
  GetWorkSpaceListDto,
  WorkSpaceListReturnDto,
};
