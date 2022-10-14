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

  async findOne(username: string) {
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

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    try {
      return user;
    } catch (err) {
      throw new HttpException(`Email ${email} not found`, HttpStatus.NOT_FOUND);
    }
  }

  async create(dto: CreateUserDto) {
    const { username, email, password, phone_number } = dto;

    // check if the user exists in the db
    const userInDb = await this.findByEmail(email);

    if (userInDb)
      throw new HttpException(
        `User with email ${email} is already exists !`,
        HttpStatus.BAD_REQUEST,
      );

    const user = this.userRepository.create({
      username,
      email,
      password,
      phone_number,
    });

    return await this.userRepository.save(user);
  }
}
