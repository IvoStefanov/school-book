import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Teacher } from './teacher.entity';
import { SchoolSubject } from 'src/enums/subjects';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
    private schoolsService: SchoolsService,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Teacher[]> {
    return this.teachersRepository.find();
  }

  find(id: number): Promise<Teacher[]> {
    return this.teachersRepository.find({ school: id });
  }

  findOne(id: number): Promise<Teacher | null> {
    return this.teachersRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.teachersRepository.delete(id);
  }

  async create(
    schoolId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
    subject: SchoolSubject,
    dataSource: DataSource,
  ): Promise<Teacher> {
    const school = await this.schoolsService.findOne(schoolId);
    const user = await this.usersService.findOneById(userId);

    const teacherLike = {
      name: name,
      address: address,
      contact: contact,
      subject: subject,
      school: school,
      user: user,
    };

    const teacher = this.teachersRepository.create(teacherLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(teacher);
    });

    return await this.findOne(teacher.id);
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
    subject: SchoolSubject,
  ): Promise<void> {
    const teacher = await this.teachersRepository.findOneById(id);
    teacher.name = name;
    teacher.address = address;
    teacher.contact = contact;
    teacher.subject = subject;
    await this.teachersRepository.save(teacher);
  }
}
