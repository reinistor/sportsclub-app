import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data) {
    return this.authService.login(data); // return JWT access token
  }

  @Post('register')
  async register(@Body() data) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    data.password = hashedPassword;
    return this.authService.register(data);
  }

  @Post('reset-password')
  async resetPassword(@Body('email') email: string) {
    return { message: 'Not implemented yet' };
  }
}
