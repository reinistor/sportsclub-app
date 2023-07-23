import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(name: string, email: string, password: string, role: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) return { message: 'User already exists' };
    const user = this.usersRepository.create({
      name,
      email,
      password, // TODO: Hash password
      role,
    });
    return await this.usersRepository.save(user);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(userId: string) {
    return await this.usersRepository.findOneBy({ id: userId });
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async deleteById(userId: string) {
    const user = await this.findById(userId);
    if (!user) return { message: 'User does not exist' };
    return await this.usersRepository.delete({ id: userId });
  }

  async getUserInfo(userId: string) {
    const user = await this.findById(userId);
    if (!user) return { message: 'User does not exist' };
    const userForUI = {
      email: user.email,
      name: user.name,
      role: user.role,
    };
    return userForUI;
  }
}
