import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PrinciplesService } from './principles.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class PrinciplesController {
  constructor(
    private principlesService: PrinciplesService,
    private dataSource: DataSource,
  ) {}

  @Get('principle-by-school')
  async getPrincipleBySchool(@Request() req) {
    return this.principlesService.findOneBySchool(req.body.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-principle')
  async createPrinciple(@Request() req) {
    return this.principlesService.create(
      req.body.schoolId,
      req.body.userId,
      req.body.name,
      req.body.address,
      req.body.contact,
      this.dataSource,
    );
  }
}
