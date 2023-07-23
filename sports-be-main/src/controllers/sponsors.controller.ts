import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { SponsorsService } from '../services/sponsors.service';

@ApiTags('sponsors')
@Controller('sponsors')
export class SponsorsController {
  constructor(private readonly sponsorsService: SponsorsService) {}

  @Post()
  async create(@Body() body) {
    return await this.sponsorsService.create(
      body.name,
      body.logo,
      body.website,
    );
  }

  @Get()
  async findAll() {
    return await this.sponsorsService.findAll();
  }

  @Get(':id')
  async findById(@Param() params) {
    return await this.sponsorsService.findById(params.id);
  }

  @Delete(':id')
  async deleteById(@Param() params) {
    return await this.sponsorsService.deleteById(params.id);
  }
}
