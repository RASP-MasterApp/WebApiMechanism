import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getAllUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    deleteById(id: number): Promise<User>;
}
