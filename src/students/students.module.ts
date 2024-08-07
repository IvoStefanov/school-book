import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { JwtService } from '@nestjs/jwt';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';
import { School } from 'src/schools/school.entity';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([School]),
  ],
  providers: [StudentsService, UsersService, JwtService, SchoolsService],
  controllers: [StudentsController],
  exports: [TypeOrmModule, StudentsService],
})
export class StudentsModule {}
