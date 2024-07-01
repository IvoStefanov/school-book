import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './evaluation.entity';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private evaluationRepository: Repository<Evaluation>,
  ) {}

  findAll(): Promise<Evaluation[]> {
    return this.evaluationRepository.find();
  }

  findOne(id: number): Promise<Evaluation | null> {
    return this.evaluationRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.evaluationRepository.delete(id);
  }
}
