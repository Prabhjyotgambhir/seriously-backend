import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';

@Injectable()
export class PostService {

    constructor(@InjectRepository(PostsRepository) private postsRepository: PostsRepository) {}

    public async getAllPosts(): Promise<Posts[]> {
        const posts = await this.postsRepository.find();
        return posts;
    }

    public async getPostById(id: number): Promise<Posts> {
        const post = await this.postsRepository.findOne(id);
        if (!post) {
            throw new NotFoundException(`Post with ${id} not found `);
        }
        return post;
    }

    public async createPost(createPostDto: CreatePostDto): Promise<Posts> {
        return this.postsRepository.createPost(createPostDto);
    }

    public async deletePostById(id: number): Promise<any> {
        const post = await this.getPostById(id);
        const result = await this.postsRepository.delete(post.id);
        return result;
    }

    public async updatePostById(id: number, updatePostDto: UpdatePostDto): Promise<Posts> {
        const post = await this.getPostById(id);
        if (updatePostDto.title) {
            post.title = updatePostDto.title;
        }
        if (updatePostDto.content) {
            post.content = updatePostDto.content;
        }
        return post;
    }
}
