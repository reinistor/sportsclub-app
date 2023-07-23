import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { isValidEmail } from '../common/utils';
import { UsersService } from './users.service';
import { EmailsService } from './emails.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly emailsService: EmailsService,
  ) {}

  async login(data) {
    const user = await this.usersRepository.findOneBy({ email: data.email });
    if (!user) throw new UnauthorizedException('Invalid credentials!');
    if (!(await bcrypt.compare(data.password, user.password)))
      throw new UnauthorizedException('Invalid credentials!');

    const jwt = await this.jwtService.signAsync({
      user: {
        id: user.id,
        role: user.role,
      },
    });

    return { accessToken: jwt };
  }

  async register(data) {
    const existingUser = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (existingUser && !('message' in existingUser))
      throw new BadRequestException('Email already used');

    const user = await this.usersRepository.save(data);
    if (!user) throw new BadRequestException('Something went wrong');

    // delete result.password;
    const jwt = await this.jwtService.signAsync({
      user: {
        id: user.id,
        role: user.role,
      },
    });

    return { message: 'Account successfully created', accessToken: jwt };
  }
}
