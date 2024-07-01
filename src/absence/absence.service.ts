import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Absence } from './absence.entity';

@Injectable()
export class AbsenceService {
  constructor(
    @InjectRepository(Absence)
    private absenceRepository: Repository<Absence>,
  ) {}

  findAll(): Promise<Absence[]> {
    return this.absenceRepository.find();
  }

  findOne(id: number): Promise<Absence | null> {
    return this.absenceRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.absenceRepository.delete(id);
  }
}
