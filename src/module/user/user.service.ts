import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(condition: any) {
    const user = await this.userRepository.findOne(condition);

    try {
      return user;
    } catch (err) {
      throw new BadRequestException('Invalid Credentials');
    }
  }

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);

    return await this.userRepository.save(user);
  }
}
