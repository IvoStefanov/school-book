import { Controller, Get, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { SchoolsService } from './schools.service';

@Controller()
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @UseGuards(LocalAuthGuard)
  @Get('schools')
  async getSchools() {
    return this.schoolsService.findAll();
  }
}
