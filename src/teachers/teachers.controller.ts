import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TeachersService } from './teachers.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class TeachersController {
  constructor(
    private teachersService: TeachersService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('teachers')
  async getTeachers(@Request() req) {
    return this.teachersService.findBySchoolId(req.query.school);
  }

  @Get('teacher-by-user')
  async getTeacherByUser(@Request() req) {
    return this.teachersService.findOneByUser(req.query.user);
  }

  @Get('teacher')
  async getTeacher(@Request() req) {
    return this.teachersService.findOne(req.query.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-teacher')
  async createTeacher(@Request() req) {
    return this.teachersService.create(
      req.body.schoolId,
      req.body.userId,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.subject,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-teacher')
  async updateTeacher(@Request() req) {
    return this.teachersService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
      req.body.subject,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-teacher')
  async removeTeacher(@Request() req) {
    return this.teachersService.remove(req.body.id);
  }
}
