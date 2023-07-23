import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ScraperService } from '../services/scraper.service';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('next')
  async getNextMatches() {
    return await this.scraperService.scrapeNextMatches();
  }

  @Get('previous')
  async getPreviousMatches() {
    return await this.scraperService.scrapePreviousMatches();
  }
}
