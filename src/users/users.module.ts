import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain/domain.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UploadController } from 'src/uploads/upload.controller';

@Module({
  imports: [DomainModule, CloudinaryModule],
  controllers: [UsersController, UploadController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
