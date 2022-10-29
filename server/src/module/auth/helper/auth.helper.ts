import { CreateUserDto } from './../../user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { User } from './../../user/entity/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../../user/user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as emailValidator from 'deep-email-validator';

@Injectable()
export class AuthHelper {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  getUserByEmail(email: string) {
    return this.userService.findByEmail(email);
  }

  validatePassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  async validateEmail(email: string) {
    return emailValidator.validate(email);
  }

  generateToken(user: User) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    const secret = this.config.get('JWT_SECRET');

    return this.jwtService.sign(payload, {
      expiresIn: '365d',
      secret,
    });
  }

  createUser(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
