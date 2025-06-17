import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { ProjectAllDataDto } from 'src/project/dto/project.dto';
import { UserAllDataDto } from 'src/user/dto/user.dto';
import { OrderTypeEnum } from 'src/utils/enums';

class TaskAllDataDto {
  id: string;
  project_id: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;

  user : UserAllDataDto;
  project : ProjectAllDataDto;
}

class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  project_id: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsString()
  due_date: string;
}

class UpdateTaskDto extends PartialType(CreateTaskDto) {}

class GetTaskListDto {
  @IsNotEmpty()
  page_number: number;

  @IsNotEmpty()
  per_page: number;

  order_by: string;

  order_type: OrderTypeEnum;
}

class TaskListReturnDto {
  data: TaskAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export {
  TaskAllDataDto,
  CreateTaskDto,
  UpdateTaskDto,
  GetTaskListDto,
  TaskListReturnDto,
};
