import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { UsersService } from './users.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    private readonly usersService: UsersService,
  ) {}

  async create(
    userId: string,
    shortTitle: string,
    longTitle: string,
    content: string,
    imageURL: string,
  ) {
    const user = await this.usersService.findById(userId);

    const article = this.articlesRepository.create({
      user,
      shortTitle,
      longTitle,
      content,
      imageURL,
    });
    return await this.articlesRepository.save(article);
  }

  async findById(id: string) {
    return await this.articlesRepository.findOneBy({ id });
  }

  async findByUserId(userId: string) {
    return await this.articlesRepository.findBy({ user: { id: userId } });
  }

  async findAll() {
    return await this.articlesRepository.find();
  }

  async deleteById(id: string) {
    const article = await this.findById(id);
    if (!article) return { message: 'Article not found' };
    return await this.articlesRepository.delete(id);
  }
}
