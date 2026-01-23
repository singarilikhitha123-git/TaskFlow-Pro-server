import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { upsertUserDto } from './dto/upsert-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(createUserDto: upsertUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }
  async updateUser(id: string, updateUser: upsertUserDto): Promise<void> {
    const response = await this.usersRepository.findOneBy({ id });
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
