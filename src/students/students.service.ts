import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Student } from './student.entity';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';
import { Grade } from 'src/enums/grade';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
    private schoolsService: SchoolsService,
    private usersService: UsersService,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  findBySchoolId(id: number): Promise<Student[]> {
    return this.studentsRepository.find({
      where: { school: { id: id } },
    });
  }

  findOne(id: number): Promise<Student | null> {
    return this.studentsRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.studentsRepository.delete(id);
  }

  async create(
    schoolId: number,
    userId: number,
    name: string,
    address: string,
    contact: string,
    grade: Grade,
    dataSource: DataSource,
  ): Promise<Student> {
    const school = await this.schoolsService.findOne(schoolId);
    const user = await this.usersService.findOneById(userId);

    const studentLike = {
      name: name,
      address: address,
      contact: contact,
      grade: grade,
      school: school,
      user: user,
    };

    const student = this.studentsRepository.create(studentLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(student);
    });

    return await this.findOne(student.id);
  }

  async update(
    id: number,
    name: string,
    address: string,
    contact: string,
    grade: Grade,
  ): Promise<void> {
    const student = await this.findOne(id);
    student.name = name;
    student.address = address;
    student.contact = contact;
    student.grade = grade;
    await this.studentsRepository.save(student);
  }
}
