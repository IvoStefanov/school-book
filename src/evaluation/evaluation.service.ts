import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { SchoolSubject } from 'src/enums/subjects';
import { Student } from 'src/students/student.entity';

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
    return this.evaluationRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.evaluationRepository.delete(id);
  }

  findByStudentIdAndSubject(studentId: number, subject: SchoolSubject) {
    return this.evaluationRepository.findOne({
      where: { student: { id: studentId }, subject: subject },
    });
  }

  findByStudentId(studentId: number) {
    return this.evaluationRepository.findOne({
      where: { student: { id: studentId } },
    });
  }

  async create(
    student: Student,
    subject: SchoolSubject,
    marks: number[],
    dataSource: DataSource,
  ): Promise<number[]> {
    const evaluationLike = {
      student: student,
      subject: subject,
      marks: marks,
    };

    const evaluation = this.evaluationRepository.create(evaluationLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(evaluation);
    });

    return (await this.findByStudentIdAndSubject(student.id, subject)).marks;
  }

  async update(
    student: Student,
    subject: SchoolSubject,
    marks: number[],
  ): Promise<number[]> {
    const evaluation = await this.findByStudentIdAndSubject(
      student.id,
      subject,
    );

    evaluation.student = student;
    evaluation.subject = subject;
    evaluation.marks = marks;
    await this.evaluationRepository.save(evaluation);

    return (await this.findByStudentIdAndSubject(student.id, subject)).marks;
  }
}
