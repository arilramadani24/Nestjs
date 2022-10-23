import { User } from './entity/user.entity';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { UserService } from './user.service';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { GetUser } from '../auth/decorator/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
}
