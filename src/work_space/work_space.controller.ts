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
import {
  CreateWorkSpaceDto,
  GetWorkSpaceListDto,
  UpdateWorkSpaceDto,
  WorkSpaceListReturnDto,
} from './dto/work_space.dto';
import { WorkSpaceService } from './work_space.service';
import { SuccessDto } from 'src/utils/global/global_dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequirePermissions } from 'src/auth/permission.decorator';
import { PermissionEnum } from 'src/utils/access_permissions';

@Controller('work-space')
export class WorkSpaceController {
  constructor(private readonly workSpaceService: WorkSpaceService) {}

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.WORK_SPACE_CREATE)
  @Post('create')
  async createWorkSpace(@Body() body: CreateWorkSpaceDto) {
    return await this.workSpaceService.createWorkSpace(body);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.WORK_SPACE_READ)
  @Get('list')
  async getWorkSpaceList(
    @Query() query: GetWorkSpaceListDto,
  ): Promise<WorkSpaceListReturnDto> {
    return await this.workSpaceService.getWorkSpaceList(query);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.WORK_SPACE_UPDATE)
  @Patch('edit/:id')
  async editWorkSpace(
    @Body() body: UpdateWorkSpaceDto,
    @Param('id') id: string,
  ): Promise<SuccessDto> {
    const ws = await this.workSpaceService.getWorkSpaceListById(id);
    return await this.workSpaceService.updateWorkSpace({ ...ws, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.WORK_SPACE_DELETE)
  @Delete('delete/:id')
  async deleteWorkSpace(@Param('id') id: string): Promise<SuccessDto> {
    return await this.workSpaceService.deleteWorkSpace(id);
  }
}
