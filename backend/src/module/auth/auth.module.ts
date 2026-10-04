import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../user/users.module';
import { TokenModule } from './token.module';
import { RefreshToken, RefreshTokenSchema } from '../schemas';
import { RefreshTokenRepository } from '../repositories/index';
import { AuthService } from './service/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    UsersModule, // needs UsersRepository
    TokenModule, // needs JwtService (access tokens) — not JwtAuthGuard here
    MongooseModule.forFeature([
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenRepository],
})
export class AuthModule {}
