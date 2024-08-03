import { StudentsService } from './students.service';
import { DataSource } from 'typeorm';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('students')
  async getStudents(@Request() req) {
    return this.studentsService.findBySchoolId(req.query.school);
  }

  @Get('student')
  async getStudent(@Request() req) {
    return this.studentsService.findOne(req.query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-student')
  async createStudent(@Request() req) {
    return this.studentsService.create(
      req.body.schoolId,
      req.body.userId,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.grade,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-student')
  async updateStudent(@Request() req) {
    return this.studentsService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.grade,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-student')
  async removeStudent(@Request() req) {
    return this.studentsService.remove(req.body.id);
  }
}
