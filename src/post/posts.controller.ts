import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { Posts } from './posts.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('posts')
export class PostController {
    private logger = new Logger('Posts');
    constructor(private postService: PostService) {}

    @Get()
    getAllPosts(): Promise<Posts[]> {
        this.logger.verbose(`Fetching all the posts`);
        return this.postService.getAllPosts();
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthGuard())
    createPost(@Body() createPostDto: CreatePostDto, @GetUser() user: User): Promise<any> {
        this.logger.verbose(`Creating a post by user ${user.email}`)
        return this.postService.createPost(createPostDto, user);
    }

    @Get('/:id') 
    getPostById(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
        return this.postService.getPostById(id);
    }

    @Delete('/:id') 
    deletePostById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<any> {
        return this.postService.deletePostById(id, user);
    }

    @Put('/:id') 
    updatePostById(@Param('id', ParseIntPipe) id: number, @Body() UpdatePostDto) {
        return this.postService.updatePostById(id, UpdatePostDto);
    }
}
