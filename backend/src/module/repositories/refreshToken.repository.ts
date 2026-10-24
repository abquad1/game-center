import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken, RefreshTokenDocument } from '../schemas';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  async create(data: {
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    userAgent?: string;
  }) {
    return this.refreshTokenModel.create(data);
  }

  async findValidByHash(
    tokenHash: string,
  ): Promise<RefreshTokenDocument | null> {
    return this.refreshTokenModel
      .findOne({ tokenHash, expiresAt: { $gt: new Date() } })
      .exec();
  }

  async deleteByHash(tokenHash: string): Promise<void> {
    await this.refreshTokenModel.deleteOne({ tokenHash }).exec();
  }

  async deleteAllForUser(userId: string): Promise<void> {
    await this.refreshTokenModel.deleteMany({ userId }).exec();
  }
}
