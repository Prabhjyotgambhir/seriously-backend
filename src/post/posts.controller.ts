import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostService } from './posts.service';
import { Posts } from './posts.model';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UpdatePostDto } from 'src/dto/update-post.dto';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    getAllPosts(): Posts[] {
        return this.postService.getAllPosts();
    }

    @Post()
    createPost(@Body() createPostDto: CreatePostDto): Posts {
        return this.postService.createPost(createPostDto);
    }

    @Get('/:id') 
    getPostById(@Param('id') id: string): Posts {
        return this.postService.getPostById(id);
    }

    @Delete('/:id') 
    deletePostById(@Param('id') id: string): boolean {
        return this.postService.deletePostById(id);
    }

    @Put('/:id') 
    updatePostById(@Param('id') id: string, @Body() UpdatePostDto) {
        return this.postService.updatePostById(id, UpdatePostDto);
    }
}
