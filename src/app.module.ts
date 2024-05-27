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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8081,
      username: 'root',
      password: 'root',
      database: 'schoolbook',
      // entities: [User, Student],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    StudentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
