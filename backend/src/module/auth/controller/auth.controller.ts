import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';
import { SignupDto, LoginDto } from './dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

const REFRESH_COOKIE_NAME = 'refresh_token';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create a new account' })
  async signup(
    @Body() dto: SignupDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signup(dto);
    this.setRefreshCookie(res, result.refreshToken);
    return { accessToken: result.accessToken };
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('login')
  @ApiOperation({ summary: 'Log in and receive a short-lived access token' })
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);
    this.setRefreshCookie(res, result.refreshToken);
    return { accessToken: result.accessToken };
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Exchange a valid refresh token cookie for a new access token',
  })
  async refresh(@Req() req: Request) {
    const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
    return this.authService.refreshAccessToken(rawRefreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('logout')
  @ApiOperation({ summary: 'Log out of the current session/device' })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rawRefreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
    await this.authService.logout(rawRefreshToken);
    res.clearCookie(REFRESH_COOKIE_NAME, { path: '/auth' });
    return { message: 'Logged out' };
  }

  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  // @Post('forgot-password')
  // @ApiOperation({ summary: 'Request a password reset link' })
  // forgotPassword(@Body() dto: ForgotPasswordDto) {
  //   return this.authService.forgotPassword(dto.email);
  // }

  // @Throttle({ default: { limit: 5, ttl: 60000 } })
  // @Post('reset-password')
  // @ApiOperation({
  //   summary: 'Complete a password reset using the emailed token',
  // })
  // resetPassword(@Body() dto: ResetPasswordDto) {
  //   return this.authService.resetPassword(dto);
  // }

  private setRefreshCookie(res: Response, rawRefreshToken: string) {
    const ttlDays = this.configService.get<number>('refreshToken.ttlDays') || 3;
    const secure = this.configService.get<boolean>('cookie.secure');

    res.cookie(REFRESH_COOKIE_NAME, rawRefreshToken, {
      httpOnly: true, // inaccessible to JavaScript — an XSS payload can't read or steal it
      secure, // only sent over HTTPS in production; set COOKIE_SECURE=false for local http dev
      sameSite: 'strict', // not sent on cross-site requests — mitigates CSRF on this cookie
      path: '/auth', // only ever sent back to /auth/* routes, not every request to your API
      maxAge: ttlDays * 24 * 60 * 60 * 1000,
    });
  }
}
