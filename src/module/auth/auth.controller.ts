import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  getAllUser() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('user')
  async authUser(@Req() req: Request) {
    try {
      const cookie = req.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) throw new UnauthorizedException();

      const user = await this.userService.findById(data['id']);

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
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

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return {
      message: 'logout success',
    };
  }
}
