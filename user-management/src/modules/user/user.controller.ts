import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser, IUserUpdate } from 'src/interfaces/user.interface';
import { VaktraResponse } from 'src/utils/response-structure/vaktra-response';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: IUser): Promise<VaktraResponse<IUser>> {
    try {
      const user = await this.userService.getUserByEmail(body.email);

      if (user) {
        return VaktraResponse.error(
          StatusCodes.BAD_REQUEST,
          'User already exists',
          ReasonPhrases.BAD_REQUEST,
        );
      }

      const createdUser = await this.userService.createUser(body);

      return VaktraResponse.success(
        StatusCodes.CREATED,
        'User created successfully',
        createdUser,
      );
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get()
  async getUsers(): Promise<VaktraResponse<IUser[]>> {
    try {
      const users = await this.userService.getAllUsers();

      return VaktraResponse.success(
        StatusCodes.OK,
        'Users fetched successfully',
        users,
      );
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/get-user-by-id/:id')
  async getUserById(@Param('id') id: number): Promise<VaktraResponse<IUser>> {
    try {
      const user = await this.userService.getUserById(id);

      if (!user) {
        return VaktraResponse.error(
          StatusCodes.NOT_FOUND,
          'User not found',
          ReasonPhrases.NOT_FOUND,
        );
      }

      return VaktraResponse.success(
        StatusCodes.OK,
        'User fetched successfully',
        user,
      );
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get('/get-user-by-email/:email')
  async getUserByEmail(
    @Param('email') email: string,
  ): Promise<VaktraResponse<IUser>> {
    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        return VaktraResponse.error(
          StatusCodes.NOT_FOUND,
          'User not found',
          ReasonPhrases.NOT_FOUND,
        );
      }

      return VaktraResponse.success(
        StatusCodes.OK,
        'User fetched successfully',
        user,
      );
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Patch()
  async updateUser(@Body() body: IUserUpdate): Promise<VaktraResponse<IUser>> {
    try {
      const user = await this.userService.getUserByEmail(body.email);

      if (!user) {
        return VaktraResponse.error(
          StatusCodes.NOT_FOUND,
          'User not found',
          ReasonPhrases.NOT_FOUND,
        );
      }

      if (user.email !== body.email && !user.email) {
        return VaktraResponse.error(
          StatusCodes.BAD_REQUEST,
          'Email cannot be changed',
          ReasonPhrases.BAD_REQUEST,
        );
      }

      const updatedUser = await this.userService.updateUser(body);

      return VaktraResponse.success(
        StatusCodes.OK,
        'User updated successfully',
        updatedUser,
      );
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Delete()
  async deleteUser(
    @Body() body: { email: string },
  ): Promise<VaktraResponse<IUser>> {
    try {
      const user = await this.userService.getUserByEmail(body.email);

      if (!user) {
        return VaktraResponse.error(
          StatusCodes.NOT_FOUND,
          'User not found',
          ReasonPhrases.NOT_FOUND,
        );
      }

      await this.userService.deleteUser(body.email);

      return VaktraResponse.success(
        StatusCodes.OK,
        'User deleted successfully',
        null,
      );
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
