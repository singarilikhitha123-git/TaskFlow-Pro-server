import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggerOptions } from 'typeorm';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() authData: LoginDto) {
    console.log('Login attempt:', authData);
    return this.authService.login(authData.email, authData.password);
  }
}
