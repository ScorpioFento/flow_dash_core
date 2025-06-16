import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAllDataDto } from 'src/user/dto/user.dto';
import { UserEntity } from 'src/user/entity/user.entity';
import { Error404NotFound, UnauthorizedError } from 'src/utils/error_thrown';
import { comparePassword, passwordRemover } from 'src/utils/password';
import { Repository } from 'typeorm';
import { LoginReturnDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async Login({ email, password }) {
    const existingUser = await this.userRepo.findOne({
      where: { email },
      relations: ['access_permissions'],
    });

    if (!existingUser) {
      Error404NotFound('User Not Found', `No user found with email ${email}`);
    }

    const isPasswordValid = await comparePassword(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      UnauthorizedError('Invalid Credentials', `Password does not match`);
    }

    return passwordRemover(existingUser);
  }

  async userJwt(user: UserAllDataDto): Promise<LoginReturnDto> {
    const payload = {
      id: user.id,
      permissions: user.access_permissions.permissions,
    };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
