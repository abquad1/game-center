import { Module } from '@nestjs/common';
import { UsersModule } from '../user/users.module';
import { TokenModule } from './token.module';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [UsersModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
