import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Schedule } from './schedule.entity';

@Controller()
export class SchedulesController {
  constructor(
    private schedulesService: SchedulesService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('schedules')
  async getSchedules(@Request() req) {
    let schedules: Promise<Schedule[] | void> = Promise.resolve();
    if (req.query.school) {
      schedules = this.schedulesService.findBySchoolId(req.query.school);
    } else if (req.query.grade) {
      schedules = this.schedulesService.findByGradeId(req.query.grade);
    } else if (req.query.teacher) {
      schedules = this.schedulesService.findByTeacherId(req.query.teacher);
    }
    return schedules;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-schedule')
  async createShedule(@Request() req) {
    return this.schedulesService.create(
      req.body.schoolId,
      req.body.grade,
      req.body.teacherId,
      req.body.date,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-schedule')
  async updateSchedule(@Request() req) {
    return this.schedulesService.update(
      req.body.id,
      req.body.grade,
      req.body.teacherId,
      req.body.date,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-schedule')
  async removeSchedule(@Request() req) {
    return this.schedulesService.remove(req.body.id);
  }
}
