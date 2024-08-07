import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { Teacher } from 'src/teachers/teacher.entity';
import { School } from 'src/schools/school.entity';
import { JwtService } from '@nestjs/jwt';
import { SchoolsService } from 'src/schools/schools.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    TypeOrmModule.forFeature([School]),
    TypeOrmModule.forFeature([Teacher]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    SchedulesService,
    JwtService,
    SchoolsService,
    TeachersService,
    UsersService,
  ],
  controllers: [SchedulesController],
  exports: [TypeOrmModule, SchedulesService],
})
export class SchedulesModule {}
