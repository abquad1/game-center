import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../../repositories/users.repository';
import { SignupDto } from '../controller/dto/signup.dto';
import { LoginDto } from '../controller/dto/login.dto';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        token: {
            accessToken: string;
        };
        user: import("../../../schemas").UserDocument;
    }>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    private issueToken;
}
