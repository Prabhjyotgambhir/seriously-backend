import { Injectable } from '@nestjs/common';
import { Posts} from './posts.model';
import * as uuid from 'uuid/v1';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UpdatePostDto } from 'src/dto/update-post.dto';

@Injectable()
export class PostService {
    private posts: Posts[] = [];

    public getAllPosts(): Posts[] {
        return this.posts;
    }

    public getPostById(id: string): Posts {
        return this.posts.find(post => post.id === id);
    }

    public createPost(createPostDto: CreatePostDto): Posts {
        const { title, content} = createPostDto;
        const post: Posts  = {
            id: uuid(),
            title,
            content,
        }

        this.posts.push(post);
        return post;
    }

    public deletePostById(id: string) {
        const post = this.posts.findIndex(post => post.id === id);
        this.posts.splice(post, 1);
        return true;
    }

    public updatePostById(id: string, updatePostDto: UpdatePostDto): Posts {
        this.posts.forEach((post) => {
            if (post.id === id) {
                if (updatePostDto.title) {
                    post.title = updatePostDto.title;
                }
                if (updatePostDto.content) {
                    post.content = updatePostDto.content;
                }
                return post;
            }
        })
        return;
    }
}
