import { Request } from 'express';
import { UserService } from '../services/user.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UserService);
    getMe(req: Request & {
        user: {
            userId: string;
        };
    }): Promise<any>;
}
