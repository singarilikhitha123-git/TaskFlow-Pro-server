import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'taskflow-pro/users',
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: 'image',
            transformation: [
              { width: 500, height: 500, crop: 'limit' },
              { quality: 'auto' },
            ],
          },
          (error: UploadApiErrorResponse, result: UploadApiResponse) => {
            if (error) {
              reject(new BadRequestException('failed to upload image'));
            } else {
              resolve(result);
            }
          },
        )
        .end(file.buffer);
    });
  }

  async deleteImage(publicId: string): Promise<{ result: string }> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject(new BadRequestException('Failed to delete image'));
        } else {
          resolve(result);
        }
      });
    });
  }
  extractPublicId(cloudinaryUrl: string): string | null {
    if (!cloudinaryUrl) return null;

    try {
      // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/folder/filename.ext
      const parts = cloudinaryUrl.split('/');
      const uploadIndex = parts.indexOf('upload');

      if (uploadIndex === -1) return null;

      // Get everything after 'upload/v123/'
      const pathParts = parts.slice(uploadIndex + 2);
      const fullPath = pathParts.join('/');

      // Remove file extension
      const publicId = fullPath.replace(/\.[^/.]+$/, '');

      return publicId;
    } catch {
      return null;
    }
  }
}
