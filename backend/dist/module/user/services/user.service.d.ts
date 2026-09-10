import { UsersRepository } from '../../../repositories/users.repository';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    getProfile(userId: string): Promise<any>;
    updateProfile(userId: string, data: {
        fullName?: string;
        avatarUrl?: string;
    }): Promise<import("../../../schemas").UserDocument>;
}
