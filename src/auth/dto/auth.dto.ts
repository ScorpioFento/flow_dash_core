import { IsNotEmpty, IsString } from 'class-validator';
import { UserAllDataDto } from 'src/user/dto/user.dto';

class LoginDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

class LoginReturnDto {
  user: UserAllDataDto;
  access_token: string;
}

export { LoginDto, LoginReturnDto };
