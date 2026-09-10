import { OnApplicationShutdown } from '@nestjs/common';
import { Connection } from 'mongoose';
export declare class DatabaseModule implements OnApplicationShutdown {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection);
    onApplicationShutdown(signal?: string): Promise<void>;
}
