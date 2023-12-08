import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from 'logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //If we want to bind middleware to every registered route at once, we can use the use() method that is supplied by the INestApplication instance:
  app.use(logger);
  await app.listen(3000);
}
bootstrap();
