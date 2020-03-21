import { Module } from '@nestjs/common';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from './posts.repository';
import { AuthModule } from 'src/auth/auth.module';
import { S3Service } from 'src/shared/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [PostController],
  providers: [PostService, S3Service, ConfigService],
  imports: [
    TypeOrmModule.forFeature([PostsRepository]),
    AuthModule
  ]
})
export class PostModule {}
