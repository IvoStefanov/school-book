import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolsRepository: Repository<School>,
  ) {}

  findAll(): Promise<School[]> {
    return this.schoolsRepository.find();
  }

  findOne(id: number): Promise<School | null> {
    return this.schoolsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.schoolsRepository.delete(id);
  }
}
