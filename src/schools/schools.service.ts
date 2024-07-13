import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
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

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
  ): Promise<void> {
    const school = await this.schoolsRepository.findOneById(id);
    school.name = name;
    school.address = address;
    school.contact = contact;
    await this.schoolsRepository.save(school);
  }

  async create(
    name: string,
    address: string,
    contact: string,
    dataSource: DataSource,
  ): Promise<void> {
    const schoolLike = {
      name: name,
      address: address,
      contact: contact,
    };
    const school = this.schoolsRepository.create(schoolLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(school);
    });
  }
}
