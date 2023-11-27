/**
 * Applications have different approaches to authentication. Passport calls those mechanisms strategies.
 * The first strategy that we want to implement is the passport-local strategy.
 * It is a strategy for authenticating with a username and password.
 * To configure a strategy, we need to provide a set of options specific to a particular strategy. In NestJS, we do it by extending the  PassportStrategy class.
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from './authentication.service';
import User from 'src/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  /**
   * For every strategy, Passport calls the validate function using a set of parameters specific for a particular strategy.
   * For the local strategy, Passport needs a method with a username and a password. In our case, the email acts as a username.
   */
  async validate(email: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }
}
