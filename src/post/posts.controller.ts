import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { Posts } from './posts.entity';

@Controller('posts')
export class PostController {
    constructor(private postService: PostService) {}

    @Get()
    getAllPosts(): Promise<Posts[]> {
        return this.postService.getAllPosts();
    }

    @Post()
    @UsePipes(ValidationPipe)
    createPost(@Body() createPostDto: CreatePostDto): Promise<Posts> {
        return this.postService.createPost(createPostDto);
    }

    @Get('/:id') 
    getPostById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postService.getPostById(id);
    }

    @Delete('/:id') 
    deletePostById(@Param('id', ParseIntPipe) id: number): Promise<any> {
        return this.postService.deletePostById(id);
    }

    @Put('/:id') 
    updatePostById(@Param('id', ParseIntPipe) id: number, @Body() UpdatePostDto) {
        return this.postService.updatePostById(id, UpdatePostDto);
    }
}
