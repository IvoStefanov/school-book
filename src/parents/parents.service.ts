import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parent } from './parent.entity';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private parentsRepository: Repository<Parent>,
  ) {}

  findAll(): Promise<Parent[]> {
    return this.parentsRepository.find();
  }

  findOne(id: number): Promise<Parent | null> {
    return this.parentsRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.parentsRepository.delete(id);
  }
}
