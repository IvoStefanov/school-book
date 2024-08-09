import { Date } from 'src/enums/date';
import { Grade } from 'src/enums/grade';
import { School } from 'src/schools/school.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => School, (school) => school.id, { eager: true })
  @JoinColumn()
  school: School;

  @Column({ type: 'enum', enum: Grade })
  grade: Grade;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Teacher, (teacher) => teacher.id, { eager: true })
  @JoinColumn()
  teacher: Teacher;

  @Column({ type: 'enum', enum: Date })
  date: Date;
}
