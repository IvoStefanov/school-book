import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { ParentsService } from './parents.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DataSource } from 'typeorm';

@Controller()
export class ParentsController {
  constructor(
    private parentService: ParentsService,
    private dataSource: DataSource,
  ) {}

  @Get('parent')
  async getPrincipleBySchool(@Request() req) {
    return this.parentService.findOne(req.query.id);
  }

  @Get('parents')
  async getParentsBySchool(@Request() req) {
    return this.parentService.findAllBySchool(req.query.schoolId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-parent')
  async createParent(@Request() req) {
    return this.parentService.create(
      req.body.schoolId,
      req.body.userId,
      req.body.name,
      req.body.address,
      req.body.contact,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-parent')
  async updateParent(@Request() req) {
    return this.parentService.update(
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.contact,
    );
  }
}
