import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GalleryImage } from '../entities/gallery-image.entity';
import { S3Service } from './s3.service';
import * as crypto from 'crypto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryImage)
    private readonly galleryImagesRepository: Repository<GalleryImage>,
    private readonly s3Service: S3Service,
  ) {}

  async save(dataUrl: string) {
    const id = crypto.randomUUID();
    const fileKey = await this.s3Service.uploadBase664File(
      dataUrl,
      id,
      'gallery-images',
    );
    const galleryImage = this.galleryImagesRepository.create({
      id,
      fileKey,
    });

    await this.galleryImagesRepository.save(galleryImage);

    delete galleryImage.createdAt;
    delete galleryImage.updatedAt;
    delete galleryImage.fileKey;

    galleryImage['url'] = this.s3Service.signGetURL(fileKey);

    return galleryImage;
  }

  async delete(id: string) {
    const galleryImage = await this.galleryImagesRepository.findOneBy({ id });
    await this.s3Service.deleteFile(galleryImage.fileKey);
    return this.galleryImagesRepository.delete({ id });
  }

  async findAll() {
    let galleryImages = await this.galleryImagesRepository.find();
    galleryImages = galleryImages.map((image) => {
      delete image.createdAt;
      delete image.updatedAt;
      image['url'] = this.s3Service.signGetURL(image.fileKey);
      delete image.fileKey;
      return image;
    });
    return galleryImages;
  }
}
