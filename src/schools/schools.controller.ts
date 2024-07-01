import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { SchoolsService } from './schools.service';
import { DataSource } from 'typeorm';

@Controller()
export class SchoolsController {
  constructor(
    private schoolsService: SchoolsService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Get('schools')
  async getSchools() {
    return this.schoolsService.findAll();
  }

  @UseGuards(LocalAuthGuard)
  @Post('create-school')
  async createSchool(@Request() req) {
    return this.schoolsService.create(
      req.name,
      req.address,
      req.contact,
      this.dataSource,
    );
  }
}
