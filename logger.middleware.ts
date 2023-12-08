import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CatsService } from 'src/cats/cats.service';

/**
 * You implement custom Nest middleware in either a function, or in a class with an @Injectable() decorator.
 * The class should implement the NestMiddleware interface, while the function does not have any special requirements.
 *
 * Nest middleware fully supports Dependency Injection. Just as with providers and controllers,
 * they are able to inject dependencies that are available within the same module.
 */

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly catsService: CatsService) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    console.log('Request...');
    console.log(this.catsService.findAll());

    res.json({ status: 'done' });
    // next();
  }
}

//Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}
