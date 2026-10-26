import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { FilterQuery, Model } from 'mongoose';
import { Model } from 'mongoose';
// import type { FilterQuery } from 'mongoose';

import { Match, MatchDocument } from '../schemas';
import { MatchStatus } from '../../common/enum';
export interface FindPublishedOptions {
  date?: string; // ISO date string, e.g. "2026-09-27" — filters by kickoffTime's calendar day
}

@Injectable()
export class MatchesRepository {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
  ) {}

  async create(data: Partial<Match>): Promise<MatchDocument> {
    return this.matchModel.create(data);
  }

  async findById(id: string): Promise<MatchDocument | null> {
    return this.matchModel.findById(id).exec();
  }

  // Public listing — status is NOT taken from the caller. It's hardcoded
  // here to PUBLISHED so a public, unauthenticated route can never be used
  // to enumerate DRAFT or CANCELLED matches by passing a different value.
  async findPublished(options: FindPublishedOptions): Promise<MatchDocument[]> {
    // const filter: FilterQuery<MatchDocument> = {
    //   status: MatchStatus.PUBLISHED,
    // };

    const filter: any = {
      status: MatchStatus.PUBLISHED,
    };

    if (options.date) {
      const start = new Date(options.date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(options.date);
      end.setHours(23, 59, 59, 999);
      filter.kickoffTime = { $gte: start, $lte: end };
    }

    return this.matchModel.find(filter).sort({ kickoffTime: 1 }).exec();
  }

  async updateById(
    id: string,
    data: Partial<Match>,
  ): Promise<MatchDocument | null> {
    return this.matchModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // The atomic seat-hold operation designed earlier in the system design.
  // Filter and update happen as one indivisible step — MongoDB guarantees
  // this, so two concurrent requests can never both succeed past the
  // available-seats limit. Returns null if the guard condition failed
  // (not enough seats, or the match isn't PUBLISHED).
  async atomicDecrementSeats(
    matchId: string,
    seatCount: number,
  ): Promise<MatchDocument | null> {
    return this.matchModel
      .findOneAndUpdate(
        {
          _id: matchId,
          status: MatchStatus.PUBLISHED,
          availableSeats: { $gte: seatCount },
        },
        { $inc: { availableSeats: -seatCount } },
        { new: true },
      )
      .exec();
  }

  // The release side of the same operation — used when a hold expires or
  // payment fails. Always safe to call: it only ever adds seats back.
  async incrementSeats(
    matchId: string,
    seatCount: number,
  ): Promise<MatchDocument | null> {
    return this.matchModel
      .findByIdAndUpdate(
        matchId,
        { $inc: { availableSeats: seatCount } },
        { new: true },
      )
      .exec();
  }
}
