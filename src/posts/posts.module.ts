import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './post.entity';
import PostsController from './posts.controller';
import PostsService from './posts.service';

@Module({
  //With repositories, we can manage a particular entity. A repository has multiple functions to interact with entities. To access it, we use the  TypeOrmModule again.
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
