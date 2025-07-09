import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteEntity } from './entity/note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto, NoteListReturnDto } from './dto/note.dto';
import {
  paginationHandler,
  queryHandler,
} from 'src/utils/global/global_functions';
import { QUERY_NOTE } from 'src/utils/queryObj';
import { Error404NotFound } from 'src/utils/error_thrown';
import { SuccessDto } from 'src/utils/global/global_dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteEntity)
    private readonly noteRepo: Repository<NoteEntity>,
  ) {}

  async getNoteList(query: any): Promise<NoteListReturnDto> {
    const [data, total] = await this.noteRepo.findAndCount(
      queryHandler(query, QUERY_NOTE),
    );

    return paginationHandler(data, total, query.page_number, query.per_page);
  }

  async getNoteListById(id: string): Promise<NoteEntity> {
    const note = await this.noteRepo.findOne({ where: { id } });
    if (!note) {
      Error404NotFound('Not Found Error', 'Task Not Found');
    }

    return note;
  }

  async createNote(note: CreateNoteDto): Promise<boolean> {
    return !!(await this.noteRepo.save(this.noteRepo.create(note)));
  }

  async updateNote(note: NoteEntity): Promise<SuccessDto> {
    return {
      success: !!(await this.noteRepo.save(note)),
    };
  }

  async deleteNote(id: string): Promise<SuccessDto> {
    return {
      success: !!(await this.noteRepo.delete(id)),
    };
  }
}
