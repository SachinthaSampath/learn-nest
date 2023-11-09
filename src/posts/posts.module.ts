import { Module } from '@nestjs/common';
import PostsController from './posts.controller';
import PostsService from './posts.service';

/***
 * We use modules to organize our application. Our  PostsController and  PostsService are closely related
 * and belong to the same application domain. Therefore, it is appropriate to put them in a module together.
 */

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService],
})
export default class PostsModule {}
