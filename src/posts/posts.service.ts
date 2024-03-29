import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Post } from './post.interface';
import { UpdatePostDto } from './dto/updatePost.dto';
import { CreatePostDto } from './dto/createPost.dto';

//A job of a service is to separate the business logic from controllers, making it cleaner and more comfortable to test.
@Injectable()
export default class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];
  getAllPosts() {
    return this.posts;
  }
  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }
  createPost(post: CreatePostDto) {
    const newPost = { id: ++this.lastPostId, ...post };
    this.posts.push(newPost);
    return newPost;
  }
  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}

/**
 * Responsible for handling business logic
 */

//We use the built-in  HttpException class to throw errors that NestJS can understand.
//When we throw  HttpException('Post not found', HttpStatus.NOT_FOUND), it gets propagated to the global exception filter,
// and a proper response is sent to the client.
