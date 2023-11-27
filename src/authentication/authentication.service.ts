import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostgresErrorCode } from 'src/database/postgresErrorCodes.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public async register(registrationData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    // If a user with that email already exists, the  usersService.create method throws an error.
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      //We create a hash and pass it to the  usersService.create method along with the rest of the data
      createdUser.password = undefined; //cleanest way to not send the password in a response.
      return createdUser;
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation)
        throw new HttpException('User with that email or username already exists', HttpStatus.BAD_REQUEST);
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
    //An important thing above is that we return the same error, whether the email or password is wrong. Doing so prevents some attacks that would aim to get a list of emails registered in our database.
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  //JSON Web Tokens are stateless. We can’t change a token to be invalid in a straightforward way. The easiest way to implement logging out is just to remove the token from the browser. Since the cookies that we designed are  HttpOnly, we need to create an endpoint that clears it.
  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
