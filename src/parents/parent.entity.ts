import { Student } from 'src/students/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  contact: string;

  @Column()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Student, (student) => student.id)
  children: Student[];
}
