import { Grade } from 'src/enums/grade';
import { School } from 'src/schools/school.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

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
  @OneToOne((type) => School, (school) => school.id)
  school: School;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToOne((type) => User, (user) => user.id)
  user: User;
}
