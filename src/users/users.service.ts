import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepo.create(data);
      return await this.usersRepo.save(user);
    } catch (error: any) {
      // Handle unique constraint (Postgres error code 23505)
      if (error.code === '23505') {
        throw new ConflictException('Email or Google ID already exists');
      }
      throw error;
    }
  }

  async findAll(limit = 20, offset = 0): Promise<User[]> {
    return await this.usersRepo.find({
      relations: ['meetings'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id },
      relations: ['meetings'],
    });

    if (!user) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // ensures existence
    Object.assign(user, data);
    return await this.usersRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    const result = await this.usersRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id "${id}" not found`);
    }
  }
}
