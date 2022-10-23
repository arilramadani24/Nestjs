import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './../user/dto/create-user.dto';
import {
  Body,
  ClassSerializerInterceptor,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  HttpStatus,
  Res,
  UnauthorizedException,
  Req,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authService.register(body);
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

      const user = await this.userService.findById(data['id']);

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
