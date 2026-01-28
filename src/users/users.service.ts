import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { upsertUserDto } from './dto/upsert-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(body: upsertUserDto): Promise<User> {
    body.password = await bcrypt.hash(body.password, 10);
    return this.usersRepository.save(body);
  }
  async updateUser(id: string, updateUser: upsertUserDto): Promise<void> {
    const response = await this.usersRepository.findOneBy({ id });
    updateUser.password = await bcrypt.hash(updateUser.password, 10);
    if (!response) {
      throw new Error('User not found');
    }
    await this.usersRepository.update(id, { ...updateUser });
  }

  async deleteUser(id: string): Promise<void> {
    const response = await this.usersRepository.findOneBy({ id });
    if (!response) {
      throw new Error('User not found');
    }
    await this.usersRepository.delete(id);
  }
}
