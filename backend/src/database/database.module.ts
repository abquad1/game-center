import { Module, OnApplicationShutdown, Logger } from '@nestjs/common';
import { MongooseModule, InjectConnection } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.uri'),
      }),
    }),
  ],
})
export class DatabaseModule implements OnApplicationShutdown {
  private readonly logger = new Logger(DatabaseModule.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Received ${signal}, closing Mongo connection...`);
    await this.connection.close();
  }
}
