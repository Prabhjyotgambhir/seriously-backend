import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { User } from 'src/auth/user.entity';
import { S3Service } from 'src/shared/s3/s3.service';

@Injectable()
export class PostService {
    public logger = new Logger('posts');

    constructor(@InjectRepository(PostsRepository) private postsRepository: PostsRepository, private s3Service: S3Service) {}

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

    public async createPost(createPostDto: CreatePostDto, user: User): Promise<any> {
        const { title, content, categoryId, image} = createPostDto;
        const post = new Posts();
        const data = await this.saveImage(image);
        post.title = title;
        post.content = content;
        post.categoryId = categoryId;
        post.imagePath = data.val.path; 
        post.image = data.name;
        post.userId = user.id;
        try {
            await post.save();
        } catch(error) {
            console.log(error);
            this.logger.error(`Error while creating a post by user ${user.email}`);
        }
        this.postsRepository.save(post);
        delete post.user;
        return { data: post, message: 'Post created Succesfully'}
    }

    public async deletePostById(id: number, user: User): Promise<any> {
        const post = await this.getPostById(id);
        const result = await this.postsRepository.delete({id: post.id, userId: user.id});
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

    public async saveImage(image: string): Promise<any> {
        const base64Data = new Buffer(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        const type = image.split(';')[0].split('/')[1];
        const name = 'Img_' + Date.now() + '.' + type;
        const path = 'post/';
        const val = await this.s3Service.imageUpload((path + name), base64Data, type);
        console.log(val, "VAL");
        return { name: name, val: val};
    }
}
