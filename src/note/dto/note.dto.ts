import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { OrderTypeEnum } from 'src/utils/enums';

class NoteAllDataDto {
  id: string;
  content: string;
  project_id: string;
  user_id: string;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  project_id: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}

class UpdateNoteDto extends PartialType(CreateNoteDto) {}

class GetNoteListDto {
  @IsNotEmpty()
  page_number: number;

  @IsNotEmpty()
  per_page: number;

  order_by: string;

  order_type: OrderTypeEnum;
}

class NoteListReturnDto {
  data: NoteAllDataDto[];
  total: number;
  current_page: number;
  per_page: number;
}

export {
  NoteAllDataDto,
  CreateNoteDto,
  UpdateNoteDto,
  GetNoteListDto,
  NoteListReturnDto,
};
