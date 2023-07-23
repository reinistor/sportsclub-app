import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { generateResetToken } from '../common/utils';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';

@Injectable()
export class EmailsService {
  constructor(
    private mailerService: MailerService,
    private readonly usersService: UsersService,
  ) {}

  async sendNewsletter(content: string) {
    const promiseArray = [];
    const users = await this.usersService.findAll();
    users.forEach((user) => {
      promiseArray.push(
        this.mailerService.sendMail({
          to: user.email,
          subject: 'CSM Suceava Newsletter',
          text: content,
        }),
      );
    });

    await Promise.all(promiseArray);

    return { message: `Newsletter sent to all users` };
  }
}
