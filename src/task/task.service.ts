import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto, TaskListReturnDto } from './dto/task.dto';
import {
  paginationHandler,
  queryHandler,
} from 'src/utils/global/global_functions';
import { QUERY_TASK } from 'src/utils/queryObj';
import { Error404NotFound } from 'src/utils/error_thrown';
import { SuccessDto } from 'src/utils/global/global_dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
  ) {}

  async getTaskList(query: any): Promise<TaskListReturnDto> {
    const [data, total] = await this.taskRepo.findAndCount(
      queryHandler(query, QUERY_TASK),
    );
    return paginationHandler(data, total, query.page_number, query.per_page);
  }

  async getTaskListById(id: string): Promise<TaskEntity> {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      Error404NotFound('Not Found Error', 'Task Not Found');
    }
    return task;
  }

  async createTask(task: CreateTaskDto): Promise<boolean> {
    return !!(await this.taskRepo.save(this.taskRepo.create(task)));
  }

  async updateTask(task: TaskEntity): Promise<SuccessDto> {
    return {
      success: !!(await this.taskRepo.save(task)),
    };
  }

  async deleteTask(id: string): Promise<SuccessDto> {
    return {
      success: !!(await this.taskRepo.delete(id)),
    };
  }
}
