import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }
}
