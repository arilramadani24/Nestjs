import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = this.authService.login(email, password);
    res.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'success',
    };
  }
}
