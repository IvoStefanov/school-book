import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './school.entity';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  providers: [SchoolsService, JwtService],
  controllers: [SchoolsController],
  exports: [TypeOrmModule],
})
export class SchoolsModule {}
