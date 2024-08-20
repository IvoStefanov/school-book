import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { Student } from './students/student.entity';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { Parent } from './parents/parent.entity';
import { Teacher } from './teachers/teacher.entity';
import { Principle } from './principles/principle.entity';
import { Schedule } from './schedules/schedule.entity';
import { School } from './schools/school.entity';
import { Evaluation } from './evaluation/evaluation.entity';
import { Absence } from './absence/absence.entity';
import { SchoolsModule } from './schools/schools.module';
import { TeachersModule } from './teachers/teachers.module';
import { SchedulesModule } from './schedules/schedules.module';
import { PrinciplesModule } from './principles/principles.module';
import { ParentsModule } from './parents/parents.module';
import { EvaluationModule } from './evaluation/evaluation.module';
import { AbsenceModule } from './absence/absence.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      // port: 8081,
      username: 'root',
      password: 'root',
      database: 'schoolbook',
      logging: 'all',
      entities: [
        User,
        Student,
        Parent,
        Teacher,
        Principle,
        Schedule,
        School,
        Evaluation,
        Absence,
      ],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    StudentsModule,
    SchoolsModule,
    TeachersModule,
    SchedulesModule,
    PrinciplesModule,
    ParentsModule,
    AuthModule,
    EvaluationModule,
    AbsenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
