import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class EvaluationController {
  constructor(
    private evaluationService: EvaluationService,
    private dataSource: DataSource,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('evaluation')
  async getEvaluation(@Request() req) {
    return (
      await this.evaluationService.findByStudentIdAndSubject(
        req.query.studentId,
        req.query.subject,
      )
    ).marks;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-evaluation')
  async createEvaluation(@Request() req) {
    return this.evaluationService.create(
      req.body.student,
      req.body.subject,
      req.body.marks,
      this.dataSource,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-evaluation')
  async updateEvaluation(@Request() req) {
    return this.evaluationService.update(
      req.body.student,
      req.body.subject,
      req.body.marks,
    );
  }
}
