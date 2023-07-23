import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GalleryService } from '../services/gallery.service';

@ApiTags('gallery')
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  async findAll() {
    return await this.galleryService.findAll();
  }

  @Post()
  async save(@Body('dataUrl') dataUrl: string) {
    return await this.galleryService.save(dataUrl);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.galleryService.delete(id);
  }
}
