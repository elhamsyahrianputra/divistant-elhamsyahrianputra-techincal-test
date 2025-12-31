import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() request: RegisterDto) {
    return {
      message: 'Login successfully',
      result: await this.authService.register(request),
    };
  }

  @Post('/login')
  async login(@Body() request: LoginDto) {
    return {
      message: 'Register successfully',
      result: await this.authService.login(request),
    };
  }
}
