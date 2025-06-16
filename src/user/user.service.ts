import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AccessLvlEntity } from './entity/access_lvl.entity';
import { ConfigService } from '@nestjs/config';
import { ACCESS_PERMISSIONS } from 'src/utils/access_permissions';
import { AccessLvlAllDataDto, CreateAccessLvlDto } from './dto/access_lvl.dto';
import { CreateUserDto } from './dto/user.dto';
import { hashPassword } from 'src/utils/password';
import { SuccessDto } from 'src/utils/global/global_dto';
import { Error404NotFound } from 'src/utils/error_thrown';

@Injectable()
export class UserService {
  constructor(
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(AccessLvlEntity)
    private readonly accesslvlRepo: Repository<AccessLvlEntity>,
  ) {}

  async createDefaultUser(): Promise<boolean> {
    const adminLoginName = this.configService.get<string>('ADMIN_NAME');
    const adminLoginPass = this.configService.get<string>('ADMIN_PASS');
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    if (!adminLoginPass) {
      throw new Error('ADMIN_PASS is not defined in environment variables');
    }
    const hashedPassword = await hashPassword(adminLoginPass);
    const defaultPermission = await this.createDefaultPermission();
    const existing = await this.userRepo.findOne({
      where: { name: adminLoginName },
    });

    const payload = {
      name: adminLoginName,
      email: adminEmail,
      password: hashedPassword,
      access_lvl_id: defaultPermission.id,
    };

    if (existing) {
      return !!(await this.userRepo.save({
        ...existing,
        ...payload,
      }));
    }

    return !!(await this.userRepo.save(this.userRepo.create(payload)));
  }

  async createDefaultPermission(): Promise<AccessLvlAllDataDto> {
    const accessLvlName = this.configService.get<string>('ACCESS_LVL_NAME');

    const existing = await this.accesslvlRepo.findOne({
      where: { name: accessLvlName },
    });

    const payload = {
      name: accessLvlName,
      description: 'default Permissions',
      permissions: ACCESS_PERMISSIONS,
    };

    if (existing) {
      return await this.accesslvlRepo.save({
        ...existing,
        ...payload,
      });
    }

    return await this.accesslvlRepo.save(this.accesslvlRepo.create(payload));
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      Error404NotFound('Not Found Error', 'User Not Found');
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<boolean> {
    const hashedPassword = await hashPassword(user.password);

    const payload = {
      ...user,
      password: hashedPassword,
    };

    return !!(await this.userRepo.save(this.userRepo.create(payload)));
  }

  async updateUser(user: UserEntity): Promise<SuccessDto> {
    return {
      success: !!(await this.userRepo.save(user)),
    };
  }

  async deleteUser(id: string): Promise<SuccessDto> {
    return {
      success: !!(await this.userRepo.delete(id)),
    };
  }

  async createAccessLvl(data: CreateAccessLvlDto): Promise<boolean> {
    return !!(await this.accesslvlRepo.save(this.accesslvlRepo.create(data)));
  }


  
}
