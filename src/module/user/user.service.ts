import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        `User with username ${username} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findById(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    try {
      return user;
    } catch (err) {
      throw new HttpException(
        `User with username ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    try {
      return user;
    } catch (err) {
      throw new HttpException(`Email ${email} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create(dto);

    return await this.userRepository.save(user);
  }
}
