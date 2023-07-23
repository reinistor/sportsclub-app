import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Championship } from '../entities/championship.entity';

@Injectable()
export class ChampionshipsService {
  constructor(
    @InjectRepository(Championship)
    private readonly championshipsRepository: Repository<Championship>,
  ) {}

  async create(name: string, location: string, startDate: Date) {
    const championship = this.championshipsRepository.create({
      name,
      location,
      startDate,
    });
    return await this.championshipsRepository.save(championship);
  }

  async findById(id: string) {
    return await this.championshipsRepository.findOneBy({ id });
  }

  async findAll() {
    return await this.championshipsRepository.find();
  }

  async deleteById(id: string) {
    const championship = await this.findById(id);
    if (!championship) return { message: 'Championship not found' };
    return await this.championshipsRepository.delete(id);
  }
}
