import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto, ProjectListReturnDto } from './dto/project.dto';
import {
  paginationHandler,
  queryHandler,
} from 'src/utils/global/global_functions';
import { QUERY_PROJECT } from 'src/utils/queryObj';
import { Error404NotFound } from 'src/utils/error_thrown';
import { SuccessDto } from 'src/utils/global/global_dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
  ) {}

  async getProjectList(query: any): Promise<ProjectListReturnDto> {
    const [data, total] = await this.projectRepo.findAndCount(
      queryHandler(query, QUERY_PROJECT),
    );

    return paginationHandler(data, total, query.page_number, query.per_page);
  }

  async getProjectListById(id: string): Promise<ProjectEntity> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      Error404NotFound('Not Found Error', 'Project Not Found');
    }

    return project;
  }

  async createProject(proj: CreateProjectDto): Promise<boolean> {
    return !!(await this.projectRepo.save(this.projectRepo.create(proj)));
  }

  async updateProject(proj: ProjectEntity): Promise<SuccessDto> {
    return {
      success: !!(await this.projectRepo.save(proj)),
    };
  }

  async deleteProject(id: string): Promise<SuccessDto> {
    return {
      success: !!(await this.projectRepo.delete(id)),
    };
  }
}
