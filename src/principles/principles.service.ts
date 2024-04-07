import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Principle } from './principle.entity';

@Injectable()
export class PrinciplesService {
  constructor(
    @InjectRepository(Principle)
    private principlesRepository: Repository<Principle>,
  ) {}

  findAll(): Promise<Principle[]> {
    return this.principlesRepository.find();
  }

  findOne(id: number): Promise<Principle | null> {
    return this.principlesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.principlesRepository.delete(id);
  }
}
