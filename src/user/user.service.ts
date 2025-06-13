import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { AccessLvlEntity } from './entity/access_lvl.entity';
import { ConfigService } from '@nestjs/config';
import { ACCESS_PERMISSIONS } from 'src/utils/access_permissions';
import { AccessLvlAllDataDto } from './dto/access_lvl.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(AccessLvlEntity)
    private readonly accesslvlRepo: Repository<AccessLvlEntity>,

    private readonly configService: ConfigService,
  ) {}

  async createDefaultUser(): Promise<boolean> {
    const adminLoginName = this.configService.get<string>('ADMIN_NAME');
    const adminLoginPass = this.configService.get<string>('ADMIN_PASS');

    const defaultPermission = await this.createDefaultPermission();
    const existing = await this.userRepo.findOne({
      where: { name: adminLoginName },
    });

    const payload = {
      name: adminLoginName,
      password: adminLoginPass,
      access_lvl_id: defaultPermission.id,
    };

    if (existing) {
      return !!this.userRepo.save({
        ...existing,
        ...payload,
      });
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
      description: 'default Permission',
      permissions: ACCESS_PERMISSIONS,
      updated_at: new Date(),
      ...(existing ? {} : { created_at: new Date() }),
    };

    const record = existing
      ? { ...existing, ...payload }
      : this.accesslvlRepo.create(payload);

    return this.accesslvlRepo.save(record);
  }
}
