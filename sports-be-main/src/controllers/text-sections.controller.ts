import {
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import { hasRoles } from 'src/decorators/roles.decorator';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { TextSectionsService } from '../services/text-sections.service';

@ApiTags('text-sections')
@Controller('text-sections')
export class TextSectionsController {
  constructor(private readonly textSectionsService: TextSectionsService) {}

  @Post()
  async create(@Body() body) {
    return await this.textSectionsService.create(body.type, body.content);
  }

  @Get()
  async findAll() {
    return await this.textSectionsService.findAll();
  }

  @Get(':type')
  async findByType(@Param('type') type: string) {
    return await this.textSectionsService.findByType(type);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @hasRoles('admin')
  @Put(':type')
  async updateByType(
    @Param('type') type: string,
    @Body('content') content: string,
  ) {
    return await this.textSectionsService.updateByType(type, content);
  }

  @Delete(':id')
  async deleteById(@Param() params) {
    return await this.textSectionsService.deleteById(params.id);
  }
}
