import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const { password, ...userDetails } = user;
      return userDetails;
    }

    return null;
  }

  async login(user) {
    const payload = { name: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  register(dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
