import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './orm.config';
import { AppController } from './app.controller';
import { GalleryController } from './controllers/gallery.controller';
import { AppService } from './app.service';
import { GalleryService } from './services/gallery.service';
import { GalleryImage } from './entities/gallery-image.entity';
import { TextSection } from './entities/text-section.entity';
import { Sponsor } from './entities/sponsor.entity';
import { Championship } from './entities/championship.entity';
import { User } from './entities/user.entity';
import { Article } from './entities/article.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailsService } from './services/emails.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/roles.guard';
import { mailConfig } from './mail.config';
import { UsersService } from './services/users.service';
import { AuthController } from './controllers/auth.controller';
import { EmailsController } from './controllers/emails.controller';
import { ArticlesService } from './services/articles.service';
import { ArticlesController } from './controllers/articles.controller';
import { SponsorsService } from './services/sponsors.service';
import { SponsorsController } from './controllers/sponsors.controller';
import { ChampionshipsController } from './controllers/championships.controller';
import { ChampionshipsService } from './services/championships.service';
import { TextSectionsController } from './controllers/text-sections.controller';
import { TextSectionsService } from './services/text-sections.service';
import { ClubMember } from './entities/club-member.entity';
import { ClubMembersController } from './controllers/club-members.controller';
import { ClubMembersService } from './services/club-members.service';
import { S3Service } from './services/s3.service';
import { ScraperService } from './services/scraper.service';
import { MatchesController } from './controllers/matches.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot(mailConfig),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Championship]),
    TypeOrmModule.forFeature([GalleryImage]),
    TypeOrmModule.forFeature([ClubMember]),
    TypeOrmModule.forFeature([Sponsor]),
    TypeOrmModule.forFeature([TextSection]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    AppController,
    GalleryController,
    AuthController,
    EmailsController,
    ArticlesController,
    SponsorsController,
    ChampionshipsController,
    ClubMembersController,
    TextSectionsController,
    ClubMembersController,
    MatchesController,
  ],
  providers: [
    AppService,
    GalleryService,
    UsersService,
    EmailsService,
    ArticlesService,
    AuthService,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    SponsorsService,
    ChampionshipsService,
    TextSectionsService,
    ClubMembersService,
    S3Service,
    ScraperService,
  ],
})
export class AppModule {}
