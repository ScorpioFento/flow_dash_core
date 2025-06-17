import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/db.module';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';
import { WorkSpaceController } from './work_space/work_space.controller';
import { WorkSpaceService } from './work_space/work_space.service';
import { WorkSpaceModule } from './work_space/work_space.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ProjectModule,
    WorkSpaceModule,
    TaskModule,    
  ],

})
export class AppModule {}
