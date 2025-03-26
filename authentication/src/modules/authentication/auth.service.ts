import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) return false;

      return bcrypt.compare(password, user.password);
    } catch (error) {
      return error;
    }
  }
}
