import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}

//Now, we can use it every time we want our users to authenticate before making a request. For example, we might want to do so, when creating posts through our API.
