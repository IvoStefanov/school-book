import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parent } from './parent.entity';
import { ParentsService } from './parents.service';
import { ParentsController } from './parents.controller';
import { School } from 'src/schools/school.entity';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { SchoolsService } from 'src/schools/schools.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parent]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([School]),
  ],
  providers: [ParentsService, JwtService, UsersService, SchoolsService],
  controllers: [ParentsController],
  exports: [TypeOrmModule, ParentsService],
})
export class ParentsModule {}
