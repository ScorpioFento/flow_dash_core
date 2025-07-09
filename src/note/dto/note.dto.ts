import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

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

export { NoteAllDataDto, CreateNoteDto, UpdateNoteDto };
