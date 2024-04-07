import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersController } from './users.controller';
import { Student } from './student.entity';
import { StudentsService } from './students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentsService],
  // controllers: [UsersController],
  exports: [TypeOrmModule],
})
export class StudentsModule {}
