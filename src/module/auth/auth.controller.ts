import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './../user/dto/create-user.dto';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Res,
  UnauthorizedException,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private user: UserService,
  ) {}

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.authService.register(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(email, password);

    res.cookie('jwt', token, { httpOnly: true });
    return {
      message: 'Login success!',
    };
  }

  @Get('user')
  async users(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.user.findById(data['id']);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
