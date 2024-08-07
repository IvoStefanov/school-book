import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { Grade } from 'src/enums/grade';
import { Date } from 'src/enums/date';
import { SchoolsService } from 'src/schools/schools.service';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
    private schoolsService: SchoolsService,
    private teachersService: TeachersService,
  ) {}

  findAll(): Promise<Schedule[]> {
    return this.schedulesRepository.find();
  }

  findBySchoolId(id: number): Promise<Schedule[]> {
    return this.schedulesRepository.find({
      where: { school: { id: id } },
    });
  }

  findByGradeId(grade: Grade): Promise<Schedule[]> {
    return this.schedulesRepository.find({
      where: { grade: grade },
    });
  }

  findByTeacherId(id: number): Promise<Schedule[]> {
    return this.schedulesRepository.find({
      where: { teacher: { id: id } },
    });
  }

  findOne(id: number): Promise<Schedule | null> {
    return this.schedulesRepository.findOneBy({ id: id });
  }

  async create(
    schoolId: number,
    grade: Grade,
    teacherId: number,
    date: Date,
    dataSource: DataSource,
  ): Promise<Schedule> {
    const school = await this.schoolsService.findOne(schoolId);
    const teacher = await this.teachersService.findOne(teacherId);

    const scheduleLike = {
      school: school,
      grade: grade,
      teacher: teacher,
      date: date,
    };

    const schedule = this.schedulesRepository.create(scheduleLike);

    await dataSource.transaction(async (manager) => {
      await manager.save(schedule);
    });

    return await this.findOne(schedule.id);
  }

  async update(
    id: number,
    grade: Grade,
    teacherId: number,
    date: Date,
  ): Promise<void> {
    const schedule = await this.findOne(id);
    const teacher = await this.teachersService.findOne(teacherId);

    schedule.grade = grade;
    schedule.teacher = teacher;
    schedule.date = date;
    await this.schedulesRepository.save(schedule);
  }

  async remove(id: number): Promise<void> {
    await this.schedulesRepository.delete(id);
  }
}
