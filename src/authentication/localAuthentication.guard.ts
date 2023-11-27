import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {}
//Passing the strategy name directly into  AuthGuard() in the controller might not be considered a clean approach. Instead, we create our own class.
