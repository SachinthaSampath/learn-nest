import { CreateUserDto } from 'src/user/dto/createUser.dto';

export class RegisterDto extends CreateUserDto {
  email: string;
  password: string;
}
