import { Grade } from 'src/enums/grade';
import { SchoolSubject } from 'src/enums/subjects';
import { School } from 'src/schools/school.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => School, (school) => school.id)
  school: School;

  @Column({ type: 'enum', enum: Grade })
  grade: Grade;

  @Column({ type: 'enum', enum: SchoolSubject })
  subject: SchoolSubject;

  @Column()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Teacher, (teacher) => teacher.id)
  teacher: Teacher;

  @Column({ type: 'enum', enum: Date })
  date: Date;
}
