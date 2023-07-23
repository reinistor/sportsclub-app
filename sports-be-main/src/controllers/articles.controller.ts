import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';
import { ApiTags } from '@nestjs/swagger/dist';
import { AuthUser } from '../decorators/user.decorator';
import { JwtAuthGuard } from '../guards/jwt.guard';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @AuthUser() user) {
    return await this.articlesService.create(
      user.id,
      body.shortTitle,
      body.longTitle,
      body.content,
      body.imageURL,
    );
  }

  @Get()
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get(':id')
  async findById(@Param() params) {
    return await this.articlesService.findById(params.id);
  }

  @Get('user/:userId')
  async findByUserId(@Param() params) {
    return await this.articlesService.findByUserId(params.userId);
  }

  @Delete(':id')
  async deleteById(@Param() params) {
    return await this.articlesService.deleteById(params.id);
  }
}
