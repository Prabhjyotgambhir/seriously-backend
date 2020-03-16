import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
  imports: [TypeOrmModule.forFeature([UserRepository]),
  JwtModule.register({
    secret: 'seriously-gambhir-blogger',
    signOptions: {
      expiresIn: 3600,
    }
  }), PassportModule.register({
    defaultStrategy: 'jwt'
  })]
})
export class AuthModule { }
