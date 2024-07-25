import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Principle } from './principle.entity';
import { PrinciplesService } from './principles.service';
import { PrinciplesController } from './principles.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SchoolsService } from 'src/schools/schools.service';
import { User } from 'src/users/user.entity';
import { School } from 'src/schools/school.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Principle]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([School]),
  ],
  providers: [PrinciplesService, JwtService, UsersService, SchoolsService],
  controllers: [PrinciplesController],
  exports: [TypeOrmModule, PrinciplesService],
})
export class PrinciplesModule {}
