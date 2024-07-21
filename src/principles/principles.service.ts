import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

  findOneBySchool(id: number): Promise<Principle | null> {
    return this.principlesRepository.findOneBy({ school: { id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.principlesRepository.delete(id);
  }

  async create(
    schoolId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
    dataSource: DataSource,
  ): Promise<void> {
    const principleLike = {
      schoolId: schoolId,
      userId: userId,
      name: name,
      address: address,
      contact: contact,
    };
    const principle = this.principlesRepository.create(principleLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(principle);
    });
  }
}
