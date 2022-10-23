import { Role } from './entities/role.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}
  async create(dto: CreateRoleDto) {
    const role = this.roleRepository.create(dto);

    return await this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.findOne(id);

    if (!role) throw new NotFoundException();

    role.role_name = dto.role_name;

    return await this.roleRepository.save(role);
  }

  async remove(id: number) {
    const role = await this.findOne(id);

    await this.roleRepository.remove(role);
  }
}
