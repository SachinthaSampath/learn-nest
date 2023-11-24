import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PostsModule } from './posts/posts.module';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_URL: Joi.string(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    StaffModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/**
 *
 * A crucial thing to running our application is to set up environment variables. *
 * In NestJS, we have a  ConfigModule that we can use in our application. It uses dotenv under the hood.
 * As soon as we create a .env file at the root of our application, NestJS injects them into a ConfigSerivice that we will use soon.
 * The  ConfigModule built into NestJS supports @hapi/joi that we can use to define a validation schema.
 */
