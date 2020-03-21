import { Repository, EntityRepository } from 'typeorm';
import { Posts } from './posts.entity';
@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {

}