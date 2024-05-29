import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { createAdmin } from 'src/utils/create-admin';
// import { Role } from 'src/enums/role';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    createAdmin(this.dataSource, this.usersRepository);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
