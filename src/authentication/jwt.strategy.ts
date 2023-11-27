//Now, we need to read the token from the Cookie header when the user requests data. To do so, we need a second passport strategy.

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { TokenPayload } from './tokenPayload.interface';

//Now, we need to read the token from the Cookie header when the user requests data. To do so, we need a second passport strategy.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.getById(payload.userId);
  }
}

/**
 * We extend the default JWT strategy by reading the token from the cookie.
 * When we successfully access the token, we use the id of the user that is encoded inside.
 * With it, we can get the whole user data through the  userService.getById
 */
