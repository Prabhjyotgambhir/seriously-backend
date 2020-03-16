import { Module } from '@nestjs/common';
import { PostModule } from './post/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule,
  TypeOrmModule.forRoot(typeOrmConfig),
  AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
