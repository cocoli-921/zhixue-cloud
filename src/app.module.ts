import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ProgressModule } from './progress/progress.module';
import { UsersModule } from './users/users.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { TasksModule } from './tasks/tasks.module';
import { StatsModule } from './stats/stats.module';
import { User } from './users/user.entity';
import { Course } from './courses/course.entity';
import { Lesson } from './courses/lesson.entity';
import { Enrollment } from './enrollments/enrollment.entity';
import { ProgressRecord } from './progress/progress-record.entity';
import { Quiz } from './quizzes/quiz.entity';
import { Question } from './quizzes/question.entity';
import { Submission } from './quizzes/submission.entity';
import { Task } from './tasks/task.entity';
import { SeedModule } from './seed/seed.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: Number(config.get<string>('DB_PORT', '3306')),
        username: config.get<string>('DB_USERNAME', 'zhixue'),
        password: config.get<string>('DB_PASSWORD', 'zhixue_password'),
        database: config.get<string>('DB_NAME', 'zhixue'),
        entities: [User, Course, Lesson, Enrollment, ProgressRecord, Quiz, Question, Submission, Task],
        synchronize: config.get<string>('DB_SYNCHRONIZE', 'false') === 'true',
      }),
    }),
    AuthModule,
    CoursesModule,
    EnrollmentsModule,
    ProgressModule,
    UsersModule,
    QuizzesModule,
    TasksModule,
    StatsModule,
    SeedModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
