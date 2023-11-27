import { Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUser } from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import { Response } from 'express';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200) //we use  @HttpCode(200) because NestJS responds with 201 Created for POST requests by default
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async login(@Req() request: RequestWithUser, @Res() response: Response) {
    const user = request.body;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);

    //We need to send the token created by the  getCookieWithJwtToken method when the user logs in successfully.
    //We do it by sending the Set-Cookie header. To do so, we need to directly use the  Response object.
    //When the browser receives this response, it sets the cookie so that it can use it later.
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  //One important additional functionality that we need is verifying JSON Web Tokens and returning user data.
  //By doing so, the browser can check if the current token is valid and get the data of the currently logged in user.
  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}

/**
 * Guard is responsible for determining whether the route handler handles the request or not.
 * In its nature, it is similar to Express.js middleware but is more powerful.
 * We focus on guards quite a bit in the upcoming parts of this series and create custom guards. Today we only use the existing guards though.
 */
