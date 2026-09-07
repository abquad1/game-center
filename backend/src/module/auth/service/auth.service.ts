import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { UsersRepository } from '../../../repositories/users.repository';
import { SignupDto } from '../controller/dto/signup.dto';
import { LoginDto } from '../controller/dto/login.dto';

const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const existing = await this.usersRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.usersRepository.create({
      email: dto.email,
      password: hashed,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return this.issueToken(user._id.toString(), user.email);
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // delete user.password;
    // delete user._id;
    // delete user.passwordResetExpires;
    // delete user.passwordResetToken;
    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');
    // WE NEED TO WORK ON A CENTRAL PLACE WHERE I WILL CONVERT ALL THAT USER._ID TO USER.ID
    const token = this.issueToken(user._id.toString(), user.email);
    return { token, user };
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user)
      return { message: 'If that email exists, a reset link was sent.' };

    const token = crypto.randomBytes(32).toString('hex');
    await this.usersRepository.updateById(user._id.toString(), {
      passwordResetToken: token,
      passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
    });

    // TODO: wire up an actual mailer. For now this is where you'd send
    // `${appUrl}/reset-password?token=${token}` to the user's email.

    return { message: 'If that email exists, a reset link was sent.' };
  }

  private issueToken(userId: string, email: string) {
    const payload = { sub: userId, email };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
