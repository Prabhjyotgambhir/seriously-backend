import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([PostsRepository]),
    AuthModule
  ]
})
export class PostModule {}
