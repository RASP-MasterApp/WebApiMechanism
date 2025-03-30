import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VaktraResponse } from 'src/utils/response-structure/vaktra-response';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<VaktraResponse<null>> {
    try {
      const isValid = await this.authService.validateUser(
        body.email,
        body.password,
      );

      if (!isValid) {
        return VaktraResponse.error(
          StatusCodes.UNAUTHORIZED,
          'Invalid credentials',
          ReasonPhrases.UNAUTHORIZED,
        );
      }

      return VaktraResponse.success(StatusCodes.OK, 'Login successful', null);
    } catch (error) {
      return VaktraResponse.error(
        StatusCodes.INTERNAL_SERVER_ERROR,
        ReasonPhrases.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }
}
