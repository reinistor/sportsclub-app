import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class ScraperService {
  isOnAWS = process.env.NODE_ENV === 'production';
  options = {
    headless: true,
    slowMo: 100,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: this.isOnAWS ? '/usr/bin/google-chrome-stable' : undefined,
  };

  async scrapeClasament() {
    let result;

    try {
      const browser = await puppeteer.launch(this.options);
      const page = await browser.newPage();
      await page.goto(
        'https://www.flashscore.ro/echipa/suceava/SEYT3DvL/clasament/#/GdL4AN9E/table/overall',
      );
      await page.waitForSelector('.tableCellParticipant__name');

      const getRankedTeams = async () => {
        return await page.evaluate(() => {
          const rows = document.querySelectorAll('.ui-table__row');
          const teams = [];
          rows.forEach((row) => {
            const rank = parseInt(
              row.querySelector('.tableCellRank').textContent.replace('.', ''),
            );
            const name = row.querySelector(
              '.tableCellParticipant__name',
            ).textContent;

            teams.push({ rank, name });
          });
          return teams;
        });
      };
      result = await getRankedTeams();

      await page.close();
      await browser.close();
    } catch (err) {
      console.log(err);
    }

    return result;
  }

  async scrapeNextMatches() {
    let result;

    try {
      const browser = await puppeteer.launch(this.options);
      const page = await browser.newPage();
      await page.goto(
        'https://www.flashscore.ro/echipa/suceava/SEYT3DvL/meciuri/',
      );
      await page.waitForSelector('.event__match');

      const getNextMatches = async () => {
        return await page.evaluate(() => {
          const rows = document.querySelectorAll('.event__match');
          const matches = [];
          rows.forEach((row) => {
            const datetime = row.querySelector('.event__time').textContent;
            const nameTeam1 = row.querySelector(
              '.event__participant--home',
            ).textContent;
            const logoTeam1 =
              'https://www.flashscore.ro' +
              row.querySelector('.event__logo--home').getAttribute('src');
            const nameTeam2 = row.querySelector(
              '.event__participant--away',
            ).textContent;
            const logoTeam2 =
              'https://www.flashscore.ro' +
              row.querySelector('.event__logo--away').getAttribute('src');
            matches.push({
              datetime,
              team1: { name: nameTeam1, logo: logoTeam1 },
              team2: { name: nameTeam2, logo: logoTeam2 },
            });
          });
          return matches;
        });
      };
      result = await getNextMatches();

      await page.close();
      await browser.close();
    } catch (err) {
      console.log(err);
    }

    return result;
  }
  async scrapePreviousMatches() {
    let result;

    try {
      const browser = await puppeteer.launch(this.options);
      const page = await browser.newPage();
      await page.goto(
        'https://www.flashscore.ro/echipa/suceava/SEYT3DvL/rezultate/',
      );
      await page.waitForSelector('.event__match');

      const getPreviousMatches = async () => {
        return await page.evaluate(() => {
          const rows = document.querySelectorAll('.event__match');
          const matches = [];
          rows.forEach((row) => {
            const datetime = row.querySelector('.event__time').textContent;
            const nameTeam1 = row.querySelector(
              '.event__participant--home',
            ).textContent;
            const logoTeam1 =
              'https://www.flashscore.ro' +
              row.querySelector('.event__logo--home').getAttribute('src');
            const scoreTeam1 = parseInt(
              row.querySelector('.event__score--home').textContent,
            );
            const nameTeam2 = row.querySelector(
              '.event__participant--away',
            ).textContent;
            const logoTeam2 =
              'https://www.flashscore.ro' +
              row.querySelector('.event__logo--away').getAttribute('src');
            const scoreTeam2 = parseInt(
              row.querySelector('.event__score--away').textContent,
            );

            matches.push({
              datetime,
              team1: { name: nameTeam1, logo: logoTeam1, score: scoreTeam1 },
              team2: { name: nameTeam2, logo: logoTeam2, score: scoreTeam2 },
            });
          });
          return matches;
        });
      };
      result = await getPreviousMatches();

      await page.close();
      await browser.close();
    } catch (err) {
      console.log(err);
    }

    return result;
  }
}
