import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import Post from './post.entity';

@Injectable()
export default class PostsService {
  //Now, in our  PostsService, we can inject the Posts repository.(imported in posts.module)
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    //With the find function, we can get multiple elements. If we don’t provide ith with any options, it returns all.
    return this.postsRepository.find();
  }

  //To get just one element we use the findOne function.
  async getPostById(id: any) {
    const post = await this.postsRepository.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  //By using the create function, we can instantiate a new Post. We can use the save function afterward to populate the database with our new entity.
  async createPost(post: CreatePostDto) {
    const newPost = await this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  //To modify an existing element, we can use the  update function. Afterward, we would use the  findOne function to return the modified element.
  async updatePost(id: any, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id);
    if (updatedPost) {
      return updatedPost;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  //To delete an element with a given id, we can use the  delete function.
  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
