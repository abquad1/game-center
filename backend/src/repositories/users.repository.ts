import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';

// The ONLY class in the app allowed to import Mongoose Model directly
// for the users collection. Every service (Users, Auth) goes through here.
@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User>): Promise<UserDocument> {
    return await this.userModel.create(data);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id).exec();
  }

  async findByResetToken(token: string): Promise<UserDocument | null> {
    return await this.userModel
      .findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() },
      })
      .exec();
  }

  async updateById(
    id: string,
    data: Partial<User>,
  ): Promise<UserDocument | null> {
    return await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }
  // deletePropertiedNotNeeded(data: Partial<User>): User {
  //   return data;
  // }
}
