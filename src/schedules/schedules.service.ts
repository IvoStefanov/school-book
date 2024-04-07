import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  findOne(id: number): Promise<Schedule | null> {
    return this.schedulesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
}
