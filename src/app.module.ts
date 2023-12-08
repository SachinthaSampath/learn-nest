import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware, logger } from 'logger.middleware';
import { CatsModule } from './cats/cats.module';

/**
 * There is no place for middleware in the @Module() decorator.
 * Instead, we set them up using the configure() method of the module class.
 * Modules that include middleware have to implement the NestModule interface. Let's set up the LoggerMiddleware at the AppModule level.
 */

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  //The configure() method can be made asynchronous using async/await (e.g., you can await completion of an asynchronous operation inside the configure() method body).
  configure(consumer: MiddlewareConsumer) {
    consumer
      //The apply() method may either take a single middleware, or multiple arguments to specify multiple middlewares.
      .apply(LoggerMiddleware, logger)
      //We can easily exclude certain routes with the exclude() method. This method can take a single string, multiple strings, or a RouteInfo object identifying routes to be excluded
      .exclude(
        { path: 'cats', method: RequestMethod.GET }, 
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      // The forRoutes() method can take a single string, multiple strings, a RouteInfo object, a controller class and even multiple controller classes.
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
