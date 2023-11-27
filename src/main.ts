import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser()); //To be able to read cookies easily we need the  cookie-parser.
  await app.listen(3000);
}
bootstrap();
