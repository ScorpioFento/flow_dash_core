import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkSpaceEntity } from './entity/work_space.entity';
import { WorkSpaceController } from './work_space.controller';
import { WorkSpaceService } from './work_space.service';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
    imports : [TypeOrmModule.forFeature([WorkSpaceEntity, UserEntity])],
    controllers : [WorkSpaceController],
    providers : [WorkSpaceService],
})

export class WorkSpaceModule {}
