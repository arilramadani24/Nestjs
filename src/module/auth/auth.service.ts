import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: CreateUserDto) {
    // Get User's email
    const { email } = dto;

    // check if the user exists in the db
    const userInDb = await this.userService.findByEmail(email);

    if (userInDb) throw new BadRequestException('User has already exists!');

    // Creating User
    const user = await this.userService.create(dto);

    return user;
  }

  async login(email: string, password: string) {
    // Check user in database
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found!');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ForbiddenException('Password wrong');
    }

    const { id, username } = user;

    const payload = {
      sub: id,
      username,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '365d',
      secret,
    });

    return token;
  }
}
