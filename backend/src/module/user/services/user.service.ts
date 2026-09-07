import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../../repositories/users.repository';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getProfile(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const { password, passwordResetToken, passwordResetExpires, ...profile } =
      user.toObject();
    return profile;
  }

  async updateProfile(
    userId: string,
    data: { fullName?: string; avatarUrl?: string },
  ) {
    const updated = await this.usersRepository.updateById(userId, data);
    if (!updated) throw new NotFoundException('User not found');
    return updated;
  }
}
