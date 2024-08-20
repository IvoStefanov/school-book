import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DataSource } from 'typeorm';
import { AbsenceService } from './absence.service';

@Controller()
export class AbsenceController {
  constructor(
    private absenceService: AbsenceService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('absence')
  async getAbsence(@Request() req) {
    let dates = (
      await this.absenceService.findByStudentIdAndSubject(
        req.query.studentId,
        req.query.subject,
      )
    ).map((absence) => absence.date);
    if (!dates.length) {
      dates = [];
    }
    return dates;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-absence')
  async createAbsence(@Request() req) {
    return this.absenceService.create(
      req.body.student,
      req.body.subject,
      req.body.absence,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-absence')
  async deleteAbsence(@Request() req) {
    return this.absenceService.delete(
      req.body.studentId,
      req.body.subject,
      req.body.absence,
    );
  }
}
