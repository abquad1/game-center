import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsersRepository } from '../../repositories/users.repository';
import { RefreshTokenRepository } from '../../repositories/refreshToken.repository';
import { UserRole } from '../../../common/enum/userEnum';
import { SignupDto, LoginDto, ForgotPasswordDto } from '../controller/dto';
const SALT_ROUNDS = 12;

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
}
@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(dto: SignupDto): Promise<AuthResult> {
    const existing = await this.usersRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);
    const user = await this.usersRepository.create({
      email: dto.email,
      password: hashed,
      fullName: dto.fullName,
    });

    return this.issueTokenPair(user.id, user.email, user.role);
  }

  async login(dto: LoginDto): Promise<AuthResult> {
    const user = await this.usersRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    return this.issueTokenPair(user.id, user.email, user.role);
  }

  async refreshAccessToken(
    rawRefreshToken: string,
  ): Promise<{ accessToken: string }> {
    if (!rawRefreshToken)
      throw new UnauthorizedException('Missing refresh token');

    const tokenHash = this.hashToken(rawRefreshToken);
    const record = await this.refreshTokenRepository.findValidByHash(tokenHash);
    if (!record)
      throw new UnauthorizedException('Invalid or expired refresh token');

    const user = await this.usersRepository.findById(record.userId.toString());
    if (!user) throw new UnauthorizedException('User no longer exists');

    return {
      accessToken: this.signAccessToken(user.id, user.email, user.role),
    };
  }

  async logout(rawRefreshToken: string): Promise<void> {
    if (!rawRefreshToken) return;
    const tokenHash = this.hashToken(rawRefreshToken);
    await this.refreshTokenRepository.deleteByHash(tokenHash);
  }

  // For "log out everywhere" — e.g. triggered from a password-change flow.
  async logoutAllSessions(userId: string): Promise<void> {
    await this.refreshTokenRepository.deleteAllForUser(userId);
  }

  // async forgotPassword(dto: ForgotPasswordDto) {
  //   const user = await this.usersRepository.findByEmail(dto.email);
  //   if (!user) {
  //     return { message: 'If that email exists, a reset link was sent.' };
  //   }
  //   const token = crypto.randomBytes(32).toString('hex');
  //   await this.usersRepository.updateById(user.id, {
  //     passwordResetToken: token,
  //     passwordResetExpires: new Date(Date.now() + 60 * 60 * 1000),
  //   });

  //   // TODO: wire up an actual mailer — send `${appUrl}/reset-password?token=${token}`.

  //   return { message: 'If that email exists, a reset link was sent.' };
  // }

  // async resetPassword(dto: ResetPasswordDto) {
  //   const user = await this.usersRepository.findByResetToken(dto.token);
  //   if (!user) throw new BadRequestException('Invalid or expired reset token');

  //   const hashed = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
  //   await this.usersRepository.updateById(user.id, {
  //     password: hashed,
  //     passwordResetToken: undefined,
  //     passwordResetExpires: undefined,
  //   });

  //   // A password reset is a strong signal to kill every existing session —
  //   // if someone else had a stolen refresh token, this ends it too.
  //   await this.logoutAllSessions(user.id);

  //   return { message: 'Password reset successful' };
  // }

  // ---------- Internals ----------

  private async issueTokenPair(
    userId: string,
    email: string,
    role: UserRole,
  ): Promise<AuthResult> {
    const accessToken = this.signAccessToken(userId, email, role);
    const refreshToken = await this.issueRefreshToken(userId);
    return { accessToken, refreshToken };
  }

  private signAccessToken(
    userId: string,
    email: string,
    role: UserRole,
  ): string {
    const payload = { sub: userId, email, role };
    return this.jwtService.sign(payload);
  }

  private async issueRefreshToken(userId: string): Promise<string> {
    // Opaque random token — not a JWT. It carries no data of its own;
    // the database record it points to is the only source of truth,
    // which is exactly what makes it revocable.
    const rawToken = crypto.randomBytes(40).toString('hex');
    const tokenHash = this.hashToken(rawToken);

    const ttlDays = this.configService.get<number>('refreshToken.ttlDays') || 3;
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);

    await this.refreshTokenRepository.create({ userId, tokenHash, expiresAt });

    return rawToken; // only this raw value ever leaves the server, via the cookie
  }

  // SHA-256, not bcrypt: this token is already high-entropy random data
  // (unlike a human password), so it doesn't need bcrypt's deliberate slowness
  // to resist guessing — a fast, deterministic hash is enough to look it up.
  private hashToken(rawToken: string): string {
    return crypto.createHash('sha256').update(rawToken).digest('hex');
  }
}
