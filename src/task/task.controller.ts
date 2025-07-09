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
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RequirePermissions } from 'src/auth/permission.decorator';
import { PermissionEnum } from 'src/utils/access_permissions';
import { CreateTaskDto, GetTaskListDto, UpdateTaskDto } from './dto/task.dto';
import { SuccessDto } from 'src/utils/global/global_dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.TASK_CREATE)
  @Post('create')
  async createTask(@Body() body: CreateTaskDto) {
    return await this.taskService.createTask(body);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.TASK_READ)
  @Get('list')
  async getTaskList(@Query() query: GetTaskListDto) {
    return await this.taskService.getTaskList(query);
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.TASK_UPDATE)
  @Post('update/:id')
  async editTask(
    @Body() body: UpdateTaskDto,
    @Param('id') id: string,
  ): Promise<SuccessDto> {
    const task = await this.taskService.getTaskListById(id);
    return await this.taskService.updateTask({ ...task, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @RequirePermissions(PermissionEnum.TASK_DELETE)
  @Delete('delete/:id')
  async deleteTask(@Param('id') id: string): Promise<SuccessDto> {
    return await this.taskService.deleteTask(id);
  }
}
