import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { AccessLvlEntity } from './entity/access_lvl.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccessLvlEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
