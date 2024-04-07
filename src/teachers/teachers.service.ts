import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teachersRepository.find();
  }

  findOne(id: number): Promise<Teacher | null> {
    return this.teachersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.teachersRepository.delete(id);
  }
}
