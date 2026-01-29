import { ConfigModule } from '@nestjs/config';
import { cloudinaryProvider } from './cloudinary.provider';
import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [ConfigModule],
  providers: [cloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService, cloudinaryProvider],
})
export class CloudinaryModule {}
