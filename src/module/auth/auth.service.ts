import { CreateUserDto } from './../user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../user/entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: CreateUserDto): Promise<User> {
    const { email } = body;

    // check if the user exists in the db
    const userInDb = await this.userService.findByEmail(email);

    if (userInDb)
      throw new HttpException(
        `User with email ${email} is already exists !`,
        HttpStatus.BAD_REQUEST,
      );

    const user = await this.userService.create(body);

    return user;
  }

  async login(email: string, password: string): Promise<string> {
    // Check User in database
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('Invalid Credentials');

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload = { id: user.id, username: user.username };

    const jwt = await this.jwtService.signAsync(payload);

    return jwt;
  }
}
