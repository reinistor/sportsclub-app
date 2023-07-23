import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubMember } from 'src/entities/club-member.entity';
import { Repository } from 'typeorm';
import { S3Service } from './s3.service';
import * as crypto from 'crypto';

@Injectable()
export class ClubMembersService {
  constructor(
    @InjectRepository(ClubMember)
    private readonly clubMembersRepository: Repository<ClubMember>,
    private readonly s3Service: S3Service,
  ) {}

  async create(
    fullName: string,
    image: string,
    nationality: string,
    birthDate: string,
    height: string,
    position: string,
    type: string,
  ) {
    const player = this.clubMembersRepository.create({
      fullName,
      nationality,
      birthDate,
      height,
      position,
      type,
    });

    player.id = crypto.randomUUID();

    const fileKey = await this.s3Service.uploadBase664File(
      image,
      player.id,
      'profile-images',
    );

    player.image = fileKey;

    const response = await this.clubMembersRepository.save(player);
    response.image = this.s3Service.signGetURL(fileKey);

    return response;
  }

  async findById(id: string) {
    const response = await this.clubMembersRepository.findOneBy({ id });
    response.image = this.s3Service.signGetURL(response.image);
    return response;
  }

  async findByType(type: string) {
    const members = await this.clubMembersRepository.findBy({ type });
    return members.map((member) => {
      member.image = this.s3Service.signGetURL(member.image);
      return member;
    });
  }

  async findAll() {
    const members = await this.clubMembersRepository.find();
    return members.map((member) => {
      member.image = this.s3Service.signGetURL(member.image);
      return member;
    });
  }

  async deleteById(id: string) {
    const player = await this.findById(id);
    if (!player) return { message: 'Club member not found' };
    return await this.clubMembersRepository.delete(id);
  }
}
