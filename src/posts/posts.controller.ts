import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import PostsService from './posts.service';
import { CreatePostDto } from './dto/createPost.dto';
import { UpdatePostDto } from './dto/updatePost.dto';

//The first thing that we can notice is that NestJS uses decorators a lot.
//To mark a class to be a controller, we use the  @Controller() decorator.
//We pass an optional argument to it. It acts as a path prefix to all of the routes within the controller.
@Controller('posts')
export default class PostsController {
  constructor(private readonly postService: PostsService) {}

  //GET /posts
  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  //GET /posts/{id}
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  //POST /posts
  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postService.createPost(post);
  }

  //PUT /posts/{id}
  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.replacePost(Number(id), post);
  }

  //DELETE /posts/{id}
  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postService.deletePost(Number(id));
  }
}
