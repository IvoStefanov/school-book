import { Grade } from 'src/enums/grade';
import { Parent } from 'src/parents/parent.entity';
import { School } from 'src/schools/school.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column({ type: 'enum', enum: Grade })
  grade: Grade;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => School, (school) => school.id, { eager: true })
  @JoinColumn()
  school: School;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Parent, (parent) => parent.id)
  @JoinColumn()
  parent: Parent;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => User, (user) => user.id, { eager: true })
  @JoinColumn()
  user: User;
}
