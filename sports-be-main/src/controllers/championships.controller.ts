import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ChampionshipsService } from '../services/championships.service';

@ApiTags('championships')
@Controller('champoinships')
export class ChampionshipsController {
  constructor(private readonly championshipsService: ChampionshipsService) {}

  @Post()
  async create(@Body() body) {
    return await this.championshipsService.create(
      body.name,
      body.location,
      body.startDate,
    );
  }

  @Get()
  async findAll() {
    return await this.championshipsService.findAll();
  }

  @Get(':id')
  async findById(@Param() params) {
    return await this.championshipsService.findById(params.id);
  }

  @Delete(':id')
  async deleteById(@Param() params) {
    return await this.championshipsService.deleteById(params.id);
  }
}
