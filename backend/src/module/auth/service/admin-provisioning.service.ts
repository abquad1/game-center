import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../../common/enum/userEnum';
import { UsersRepository } from '../../repositories/users.repository';

const SALT_ROUNDS = 12;

@Injectable()
export class AdminProvisioningService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminProvisioningService.name);

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const email = this.configService.get<string>('admin.email')?.toLowerCase();
    const password = this.configService.get<string>('admin.password');

    if (!email || !password) {
      this.logger.warn(
        'Initial admin not provisioned: set ADMIN_EMAIL and ADMIN_PASSWORD to enable it.',
      );
      return;
    }

    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      if (existingUser.role !== UserRole.ADMIN) {
        throw new Error(
          'The configured ADMIN_EMAIL belongs to a non-admin account. Choose an unused email or promote that account explicitly.',
        );
      }

      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    await this.usersRepository.create({
      email,
      password: hashedPassword,
      fullName: 'Administrator',
      role: UserRole.ADMIN,
    });

    this.logger.log('Initial admin account provisioned.');
  }
}
