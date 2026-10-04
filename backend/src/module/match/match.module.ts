import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from '../schemas';
import { TokenModule } from '../auth/token.module'; // JwtAuthGuard for admin routes — not AuthModule (avoids circular dependency)
import { MatchesRepository } from '../repositories';
import { MatchesService } from './service/match.service';
import { MatchesController } from './controller/match.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }]),
    TokenModule,
  ],
  controllers: [MatchesController],
  providers: [MatchesRepository, MatchesService],
  exports: [MatchesRepository],
})
export class MatchesModule {}
