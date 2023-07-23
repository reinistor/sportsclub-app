import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextSection } from '../entities/text-section.entity';

@Injectable()
export class TextSectionsService {
  constructor(
    @InjectRepository(TextSection)
    private readonly textSectionsRepository: Repository<TextSection>,
  ) {}

  async create(type: string, content: string) {
    const textSection = this.textSectionsRepository.create({
      type,
      content,
    });
    return await this.textSectionsRepository.save(textSection);
  }

  async findById(id: string) {
    return await this.textSectionsRepository.findOneBy({ id });
  }

  async findByType(type: string) {
    return await this.textSectionsRepository.findOneBy({ type });
  }

  async updateByType(type: string, content: string) {
    const textSection = await this.findByType(type);
    if (!textSection) return { message: 'Text section not found' };
    textSection.content = content;
    return await this.textSectionsRepository.save(textSection);
  }

  async findAll() {
    return await this.textSectionsRepository.find();
  }

  async deleteById(id: string) {
    const textSection = await this.findById(id);
    if (!textSection) return { message: 'Text section not found' };
    return await this.textSectionsRepository.delete(id);
  }
}
