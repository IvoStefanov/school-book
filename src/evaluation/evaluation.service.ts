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
    return this.evaluationRepository
      .createQueryBuilder('evaluation')
      .where(
        `evaluation.studentId = "${studentId}" AND evaluation.subject = "${subject}"`,
      )
      .getOne();
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
  ): Promise<void> {
    const evaluationLike = {
      student: student,
      subject: subject,
      marks: marks,
    };

    if (
      !evaluationLike.student ||
      !evaluationLike.subject ||
      !evaluationLike.marks
    ) {
      return;
    }

    const evaluation = this.evaluationRepository.create(evaluationLike);

    return await dataSource.transaction(async (manager) => {
      await manager.save(evaluation);
    });
  }

  async update(
    student: Student,
    subject: SchoolSubject,
    marks: number[],
  ): Promise<void> {
    const evaluation = await this.findByStudentIdAndSubject(
      student.id,
      subject,
    );

    evaluation.marks = marks;
    await this.evaluationRepository.save(evaluation);
  }
}
