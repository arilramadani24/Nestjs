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

  findAll() {
    return this.userRepository.find();
  }

  async findByName(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    try {
      return user;
    } catch (err) {
      throw new BadRequestException(
        `User with username: ${username} not found`,
      );
    }
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    try {
      return user;
    } catch (err) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    try {
      return user;
    } catch (err) {
      throw new BadRequestException(`User with email: ${email} not found`);
    }
  }

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);

    return await this.userRepository.save(user);
  }
}
