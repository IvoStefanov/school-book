import { Student } from 'src/students/student.entity';
import { SchoolSubject } from 'src/enums/subjects';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Absence {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => Student, (student) => student.id)
  student: Student;

  @Column({ type: 'enum', enum: SchoolSubject })
  subject: SchoolSubject;
}
