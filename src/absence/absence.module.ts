import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceService } from './absence.service';
import { AbsenceController } from './absence.controller';
import { Absence } from './absence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Absence])],
  providers: [AbsenceService],
  controllers: [AbsenceController],
  exports: [TypeOrmModule],
})
export class AbsenceModule {}
