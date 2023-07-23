import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sponsor } from '../entities/sponsor.entity';
import { S3Service } from './s3.service';
import * as crypto from 'crypto';

@Injectable()
export class SponsorsService {
  constructor(
    @InjectRepository(Sponsor)
    private readonly sponsorsRepository: Repository<Sponsor>,
    private readonly s3Service: S3Service,
  ) {}

  async create(name: string, logo: string, website: string) {
    const sponsor = this.sponsorsRepository.create({
      name,
      logo,
      website,
    });
    sponsor.id = crypto.randomUUID();
    let fileKey = await this.s3Service.uploadBase664File(
      logo,
      sponsor.id,
      'sponsor-logos',
    );
    sponsor.logo = fileKey;
    const response = await this.sponsorsRepository.save(sponsor);
    response.logo = this.s3Service.signGetURL(fileKey);
    return response;
  }

  async findById(id: string) {
    const response = await this.sponsorsRepository.findOneBy({ id });
    return response;
  }

  async findAll() {
    const response = await this.sponsorsRepository.find();
    return response.map((sponsor) => {
      sponsor.logo = this.s3Service.signGetURL(sponsor.logo);
      return sponsor;
    });
  }

  async deleteById(id: string) {
    const sponsor = await this.findById(id);
    if (!sponsor) return { message: 'Sponsor not found' };
    await this.s3Service.deleteFile(sponsor.logo);
    return await this.sponsorsRepository.delete(id);
  }
}
