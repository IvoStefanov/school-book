import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Principle } from './principle.entity';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PrinciplesService {
  constructor(
    @InjectRepository(Principle)
    private principlesRepository: Repository<Principle>,
    private schoolsService: SchoolsService,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Principle[]> {
    return this.principlesRepository.find();
  }

  findOne(id: number): Promise<Principle | null> {
    return this.principlesRepository.findOneBy({ id: id });
  }

  findOneByUser(id: number): Promise<Principle | null> {
    return this.principlesRepository.findOne({ where: { user: { id: id } } });
  }

  findOneBySchool(id: number): Promise<Principle | null> {
    return this.principlesRepository.findOne({ where: { school: { id: id } } });
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
  ): Promise<Principle> {
    const school = await this.schoolsService.findOne(schoolId);
    const user = await this.usersService.findOneById(userId);

    const principleLike = {
      name: name,
      address: address,
      contact: contact,
      school: school,
      user: user,
    };

    const principle = this.principlesRepository.create(principleLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(principle);
    });

    return await this.findOneBySchool(schoolId);
  }

  async update(
    schoolId: number,
    name: string,
    address: string,
    contact: string,
  ): Promise<Principle> {
    const principle = await this.findOneBySchool(schoolId);
    principle.name = name;
    principle.address = address;
    principle.contact = contact;
    await this.principlesRepository.save(principle);

    return principle;
  }
}
