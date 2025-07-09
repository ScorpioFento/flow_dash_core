import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequirePermissions } from 'src/auth/permission.decorator';
import { PermissionEnum } from 'src/utils/access_permissions';
import {
  CreateProjectDto,
  GetProjectListDto,
  UpdateProjectDto,
} from './dto/project.dto';
import { SuccessDto } from 'src/utils/global/global_dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.PROJECT_CREATE)
  @Post('create')
  async createProject(@Body() body: CreateProjectDto) {
    return await this.projectService.createProject(body);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.PROJECT_READ)
  @Get('list')
  async getProjectList(@Query() query: GetProjectListDto) {
    return await this.projectService.getProjectList(query);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.PROJECT_UPDATE)
  @Post('update/:id')
  async editProject(
    @Body() body: UpdateProjectDto,
    @Param('id') id: string,
  ): Promise<SuccessDto> {
    const project = await this.projectService.getProjectListById(id);
    return await this.projectService.updateProject({ ...project, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.PROJECT_DELETE)
  @Delete('delete/:id')
  async deleteProject(@Param('id') id: string): Promise<SuccessDto> {
    return await this.projectService.deleteProject(id);
  }
}
