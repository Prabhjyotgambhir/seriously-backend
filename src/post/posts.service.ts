import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreatePostDto } from 'src/post/dto/create-post.dto';
import { UpdatePostDto } from 'src/post/dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entity';
import { User } from 'src/auth/user.entity';
import { S3Service } from 'src/shared/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { get } from 'request-promise';
import { CreateEnquiryDto } from './dto/create-enquiry.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class PostService {
    public logger = new Logger('posts');

    constructor(@InjectRepository(PostsRepository) private postsRepository: PostsRepository, private s3Service: S3Service,
    private configService: ConfigService, private mailerService: MailerService) {}

    public async getAllPosts(limit: number, page: number): Promise<any> {
        const [posts, total] = await this.postsRepository.findAndCount({
            take: limit,
            skip: page,
        });
        return posts;
    }

    public async getLatestPost(): Promise<Posts> {
        const post = await this.postsRepository.findOne({
            where: {
                
            }
        });
        return post;
    }

    public async getPopularPosts(limit: number, page: number): Promise<any> {
        const [posts, total] = await this.postsRepository.findAndCount({
            take: limit,
            skip: page,
            where: {
                popular: true
            }
        });
        console.log(posts);
        return posts;
    }

    public async getBanner(): Promise<any> {
        const banner = await this.postsRepository.find();
        return banner;
    }

    public async getCovidData(): Promise<any> {
        const covidUrl = 'https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats';
        const options = {
            uri: covidUrl,
            headers: {
                'x-rapidapi-key': this.configService.get<string>('RAPID_KEY'),
                'x-rapidapi-host': this.configService.get<string>('RAPID_HOST')
            },
            json: true // Automatically parses the JSON string in the response
        };
        
        const result = await get(options);
        return result;
    }

    public async getPostById(id: number): Promise<Posts> {
        const post = await this.postsRepository.findOne(id);
        if (!post) {
            throw new NotFoundException(`Post with ${id} not found `);
        }
        return post;
    }

    public async createPost(createPostDto: CreatePostDto, user: User): Promise<any> {
        const { title, content, categoryId, image, popular} = createPostDto;
        const post = new Posts();
        const data = await this.saveImage(image);
        post.title = title;
        post.content = content;
        post.categoryId = categoryId;
        post.imagePath = data.val.path; 
        post.image = data.name;
        post.userId = user.id;
        post.createdAt = new Date();
        this.logger.error(`post ${popular}`);
        post.popular = popular;
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

    public async createEnquiry(createEnquiryDto: CreateEnquiryDto): Promise<any> {
        const { title, query, email, contact} = createEnquiryDto;
        try {
            this.mailerService.sendMail({
                to: 'knowprabhjyot@gmail.com', // list of receivers
                from: 'enquiry@seriouslygambhir.com', // sender address
                subject: `${title}`, // Subject line
                text: `${query}`, // plaintext body
                html: `<b>Hi prabhjyot, <br>
                <span>You received a query from </span><br>
                <span>Email - ${email} </span> <br>
                <span>Contact - ${contact} </span> <br>
                </b>`, // HTML body content
            })
            .then(() => {
                return { message: 'Query Submitted Successfully'}
             })
            .catch((error) => { 
                console.log(error);
                this.logger.error(`Error while Emailing query`);
            });
        return { message: 'Query Submitted Successfully'}
        } catch(error) {
            console.log(error);
            this.logger.error(`Error while Emailing query`);
        }
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
