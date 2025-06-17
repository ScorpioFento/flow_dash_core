import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSpaceEntity } from './entity/work_space.entity';
import {
  CreateWorkSpaceDto,
  WorkSpaceListReturnDto,
} from './dto/work_space.dto';
import {
  paginationHandler,
  queryHandler,
} from 'src/utils/global/global_functions';
import { QUERY_WORK_SPACE } from 'src/utils/queryObj';
import { SuccessDto } from 'src/utils/global/global_dto';
import { Repository } from 'typeorm';
import { Error404NotFound } from 'src/utils/error_thrown';

@Injectable()
export class WorkSpaceService {
  constructor(
    @InjectRepository(WorkSpaceEntity)
    private readonly workSpaceRepo: Repository<WorkSpaceEntity>,
  ) {}

  async getWorkSpaceList(query: any): Promise<WorkSpaceListReturnDto> {
    const [data, total] = await this.workSpaceRepo.findAndCount(
      queryHandler(query, QUERY_WORK_SPACE),
    );
    return paginationHandler(data, total, query.page_number, query.per_page);
  }

  async getWorkSpaceListById(id: string): Promise<WorkSpaceEntity> {
    const ws = await this.workSpaceRepo.findOne({ where: { id } });
    if (!ws) {
      Error404NotFound('Not Found Error', 'Work Space Not Found');
    }
    return ws;
  }

  async createWorkSpace(ws: CreateWorkSpaceDto): Promise<boolean> {
    return !!(await this.workSpaceRepo.save(this.workSpaceRepo.create(ws)));
  }

  async updateWorkSpace(ws: WorkSpaceEntity): Promise<SuccessDto> {
    return {
      success: !!(await this.workSpaceRepo.save(ws)),
    };
  }

  async deleteWorkSpace(id: string): Promise<SuccessDto> {
    return {
      success: !!(await this.workSpaceRepo.delete(id)),
    };
  }
}
