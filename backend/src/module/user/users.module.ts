import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas';
import { TokenModule } from '../auth/token.module'; // for JwtAuthGuard — NOT AuthModule
import { UsersRepository } from '../../repositories';
import { UserService } from './services/user.service';
import { UsersController } from './controller/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    TokenModule,
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UserService],
  exports: [UsersRepository],
})
export class UsersModule {}
