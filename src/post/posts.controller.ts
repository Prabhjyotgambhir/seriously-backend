import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger, Request } from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { Posts } from './posts.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('posts')
export class PostController {
    private logger = new Logger('Posts');
    constructor(private postService: PostService) {}

    @Get()
    getAllPosts(@Request() request): Promise<Posts[]> {
        this.logger.verbose(`Fetching all the posts`);
        const limit = request.query.hasOwnProperty('limit') ? request.query.limit : 10;
        const page = request.query.hasOwnProperty('page') ? request.query.page : 0;
        return this.postService.getAllPosts(limit, page);
    }

    @Get('/covid')
    getCovidData(): Promise<any> {
        this.logger.verbose(`Fetching all the covid data`);
        return this.postService.getCovidData();
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
