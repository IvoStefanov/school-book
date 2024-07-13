import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class SchoolsController {
  constructor(
    private schoolsService: SchoolsService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('schools')
  async getSchools() {
    return this.schoolsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-school')
  async createSchool(@Request() req) {
    return this.schoolsService.create(
      req.body.name,
      req.body.address,
      req.body.contact,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-school')
  async updateSchool(@Request() req) {
    return this.schoolsService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-school')
  async removeSchool(@Request() req) {
    return this.schoolsService.remove(req.body.id);
  }
}
