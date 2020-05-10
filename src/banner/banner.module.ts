import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from './banner.repository';
import { AuthModule } from 'src/auth/auth.module';
import { S3Service } from 'src/shared/s3/s3.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BannerController],
  providers: [BannerService, S3Service, ConfigService],
  imports: [
    TypeOrmModule.forFeature([BannerRepository]),
    AuthModule
  ]
})
export class BannerModule {}
