import { SchoolSubject } from 'src/enums/subjects';
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
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column({ type: 'enum', enum: SchoolSubject })
  subject: SchoolSubject;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => School, (school) => school.id)
  @JoinColumn()
  school: School;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
