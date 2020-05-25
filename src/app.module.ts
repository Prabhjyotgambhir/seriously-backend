import { Module } from '@nestjs/common';
import { PostModule } from './post/posts.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BannerModule } from './banner/banner.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
  PostModule,
  CategoryModule,
  BannerModule,
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot(typeOrmConfig),
  AuthModule,
  MailerModule.forRoot({
    transport: {
      host: 'smtp.gmail.com',
      port: '465',
      secure: true,
      auth: {
        user: 'prabhjyotgambhir1994@gmail.com',
        pass: 'Support@1234',
      },
    },
    defaults: {
      from: '"No Reply" <no-reply@localhost>',
    },
    template: {
      dir: __dirname + '/templates',
      adapter: new PugAdapter(),
      options: {
        strict: true,
      },
    },
  }),
],
  controllers: [],
  providers: [],
})
export class AppModule {}
