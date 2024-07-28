import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { School } from 'src/schools/school.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SchoolsService } from 'src/schools/schools.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([School]),
  ],
  providers: [TeachersService, UsersService, JwtService, SchoolsService],
  controllers: [TeachersController],
  exports: [TypeOrmModule, TeachersService],
})
export class TeachersModule {}
