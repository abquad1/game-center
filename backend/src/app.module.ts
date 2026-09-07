import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import configuration, { envValidationSchema } from './config/configuration';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './module/user/users.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: envValidationSchema,
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 20 }]), // global default
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
