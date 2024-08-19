import { Student } from 'src/students/student.entity';
import { SchoolSubject } from 'src/enums/subjects';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  marks: number[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Student, (student) => student.id)
  @JoinColumn()
  student: Student;

  @Column({ type: 'enum', enum: SchoolSubject })
  subject: SchoolSubject;
}
