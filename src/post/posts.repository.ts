import { Repository, EntityRepository } from 'typeorm';
import { Posts } from './posts.entity';
import { CreatePostDto } from './dto/create-post.dto';

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {

    public async createPost(createPostDto: CreatePostDto): Promise<Posts> {
        const { title, content} = createPostDto;
        const post = new Posts();
        post.title = title;
        post.content = content;
        await post.save();
        return post;
    }
}