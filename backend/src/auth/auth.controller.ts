import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() request: RegisterDto) {
    return this.authService.register(request);
  }

  @Post('/login')
  login(@Body() request: LoginDto) {
    return this.authService.login(request);
  }
}
