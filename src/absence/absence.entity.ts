import { Student } from 'src/students/student.entity';
import { SchoolSubject } from 'src/enums/subjects';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Absence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Student, (student) => student.id)
  @JoinColumn()
  student: Student;

  @Column({ type: 'enum', enum: SchoolSubject })
  subject: SchoolSubject;
}
