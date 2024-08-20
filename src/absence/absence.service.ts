import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Absence } from './absence.entity';
import { SchoolSubject } from 'src/enums/subjects';
import { Student } from 'src/students/student.entity';

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

  findByStudentIdAndSubject(studentId: number, subject: SchoolSubject) {
    return this.absenceRepository
      .createQueryBuilder('absence')
      .where(
        `absence.studentId = "${studentId}" AND absence.subject = "${subject}"`,
      )
      .getMany();
  }

  async create(
    student: Student,
    subject: SchoolSubject,
    absence: string,
    dataSource: DataSource,
  ): Promise<void> {
    const absenceLike = {
      student: student,
      subject: subject,
      date: absence,
    };

    if (!absenceLike.student || !absenceLike.subject || !absenceLike.date) {
      return;
    }

    return await dataSource.transaction(async (manager) => {
      await manager.save(this.absenceRepository.create(absenceLike));
    });
  }

  async delete(
    studentId: number,
    subject: SchoolSubject,
    date: string,
  ): Promise<void> {
    if (!studentId || !subject || !date) {
      return;
    }

    const id = (
      await this.absenceRepository
        .createQueryBuilder('absence')
        .where(
          `absence.studentId = "${studentId}"` +
            ` AND absence.subject = "${subject}"` +
            ` AND absence.date = "${date}"`,
        )
        .getOne()
    ).id;

    await this.absenceRepository.delete(id);
  }
}
