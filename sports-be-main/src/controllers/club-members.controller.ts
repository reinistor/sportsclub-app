import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { ClubMembersService } from 'src/services/club-members.service';

@ApiTags('club-members')
@Controller('club-members')
export class ClubMembersController {
  constructor(private readonly clubMembersService: ClubMembersService) {}

  @Post()
  async create(@Body() body) {
    return await this.clubMembersService.create(
      body.fullName,
      body.image,
      body.nationality,
      body.birthDate,
      body.height,
      body.position,
      body.type,
    );
  }

  @Get()
  async findAll() {
    return await this.clubMembersService.findAll();
  }

  @Get(':type')
  async findById(@Param('type') type: string) {
    return await this.clubMembersService.findByType(type);
  }

  @Delete(':id')
  async deleteById(@Param() params) {
    return await this.clubMembersService.deleteById(params.id);
  }
}
