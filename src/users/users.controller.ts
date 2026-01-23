import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { upsertUserDto } from './dto/upsert-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  createUser(@Body() createUserDto: upsertUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() updateUser: upsertUserDto) {
    return this.usersService.updateUser(id, updateUser);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
