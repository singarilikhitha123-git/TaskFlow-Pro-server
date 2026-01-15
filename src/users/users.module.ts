import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DomainModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
