import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Principle } from './principle.entity';
import { PrinciplesService } from './principles.service';
import { PrinciplesController } from './principles.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Principle])],
  providers: [PrinciplesService, JwtService],
  controllers: [PrinciplesController],
  exports: [TypeOrmModule],
})
export class PrinciplesModule {}
