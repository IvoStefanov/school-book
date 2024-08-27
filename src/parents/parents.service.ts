import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Parent } from './parent.entity';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ParentsService {
  constructor(
    @InjectRepository(Parent)
    private parentsRepository: Repository<Parent>,
    private schoolsService: SchoolsService,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Parent[]> {
    return this.parentsRepository.find();
  }

  findAllBySchool(schoolId: number): Promise<Parent[]> {
    return this.parentsRepository.find({ where: { school: { id: schoolId } } });
  }

  findOne(id: number): Promise<Parent | null> {
    return this.parentsRepository.findOneBy({ id: id });
  }

  findOneByUser(id: number): Promise<Parent | null> {
    return this.parentsRepository.findOne({ where: { user: { id: id } } });
  }

  async remove(id: number): Promise<void> {
    await this.parentsRepository.delete(id);
  }

  async create(
    schoolId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
    dataSource: DataSource,
  ): Promise<Parent> {
    const school = await this.schoolsService.findOne(schoolId);
    const user = await this.usersService.findOneById(userId);

    const parentLike = {
      name: name,
      address: address,
      contact: contact,
      school: school,
      user: user,
    };

    const parent = this.parentsRepository.create(parentLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(parent);
    });

    return parent;
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
  ): Promise<Parent> {
    const parent = await this.findOne(id);
    parent.name = name;
    parent.address = address;
    parent.contact = contact;
    await this.parentsRepository.save(parent);

    return parent;
  }
}
