import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { Absence } from './absence.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Absence])],
  providers: [AbsenceService, JwtService],
  controllers: [AbsenceController],
  exports: [TypeOrmModule, AbsenceService],
})
export class AbsenceModule {}
