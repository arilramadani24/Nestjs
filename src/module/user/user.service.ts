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

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    try {
      return user;
    } catch (err) {
      throw new HttpException(`Email ${email} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string) {
    const user = await this.userRepository.findBy({ id });

    try {
      return user;
    } catch (err) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
