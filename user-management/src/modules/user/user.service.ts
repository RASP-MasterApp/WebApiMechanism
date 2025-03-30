import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser, IUserUpdate } from 'src/interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: IUser): Promise<User> {
    try {
      const user = this.userRepository.create({
        ...userDetails,
        role: 'user', // Default role is user
      });

      return this.userRepository.save(user);
    } catch (error) {
      return error;
    }
  }

  async getAllUsers() {
    try {
      return this.userRepository.find();
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number) {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async getUserByEmail(email: string) {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (error) {
      return error;
    }
  }

  async updateUser(userDetails: IUserUpdate): Promise<User> {
    try {
      const { id, ...user } = userDetails;
      await this.userRepository.update({ id }, { ...user });
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async deleteUser(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) return { message: 'User not found' };

      await this.userRepository.delete(user.id);
      return { message: 'User deleted' };
    } catch (error) {
      return error;
    }
  }
}
