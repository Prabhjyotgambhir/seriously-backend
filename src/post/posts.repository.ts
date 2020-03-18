import { Repository, EntityRepository } from 'typeorm';
import { Posts } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/auth/user.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
    public logger = new Logger('posts');
    public async createPost(createPostDto: CreatePostDto, user: User): Promise<Posts> {
        const { title, content} = createPostDto;
        const post = new Posts();
        post.title = title;
        post.content = content;
        post.user = user;
        try {
            await post.save();
        } catch(error) {
            this.logger.error(`Error while creating a post by user ${user.email}`);
        }
        delete post.user;
        return post;
    }
}