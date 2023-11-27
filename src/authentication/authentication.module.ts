import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthenticationService } from './authentication.service';
import { LocalStrategy } from './local.strategy';
import { AuthenticationController } from './authentication.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,

    //Thanks to this, we can now use JwtService in our AuthenticationService.
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${ConfigService.get('JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy, JwtStrategy],
})
export class AuthenticationModule {}
