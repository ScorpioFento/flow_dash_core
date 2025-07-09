import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequirePermissions } from 'src/auth/permission.decorator';
import { PermissionEnum } from 'src/utils/access_permissions';
import { CreateNoteDto, GetNoteListDto, UpdateNoteDto } from './dto/note.dto';
import { SuccessDto } from 'src/utils/global/global_dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.NOTE_CREATE)
  @Post('create')
  async createNote(@Body() body: CreateNoteDto) {
    return await this.noteService.createNote(body);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.NOTE_READ)
  @Get('list')
  async getNoteList(@Query() query: GetNoteListDto) {
    return await this.noteService.getNoteList(query);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.NOTE_UPDATE)
  @Patch('update/:id')
  async editNote(
    @Body() body: UpdateNoteDto,
    @Param('id') id: string,
  ): Promise<SuccessDto> {
    const note = await this.noteService.getNoteListById(id);
    return await this.noteService.updateNote({ ...note, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.NOTE_DELETE)
  @Delete('delete/:id')
  async deleteNote(@Param('id') id: string): Promise<SuccessDto> {
    return await this.noteService.deleteNote(id);
  }
}
