import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { WorkSpaceAllDataDto } from 'src/work_space/dto/work_space.dto';

class ProjectAllDataDto {
  id: string;
  work_space_id: string;
  title: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  work_space: WorkSpaceAllDataDto;
}

class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  work_space_id: string;
}

class UpdateProjectDto extends PartialType(CreateProjectDto) {}

export { ProjectAllDataDto, CreateProjectDto, UpdateProjectDto };
