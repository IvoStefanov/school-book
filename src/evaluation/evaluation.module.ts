import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evaluation } from './evaluation.entity';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Evaluation])],
  providers: [EvaluationService, JwtService],
  controllers: [EvaluationController],
  exports: [TypeOrmModule, EvaluationService],
})
export class EvaluationModule {}
