import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { Lesson } from '../courses/lesson.entity';
import { Quiz } from '../quizzes/quiz.entity';
import { Question } from '../quizzes/question.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Course, Lesson, Quiz, Question])],
  providers: [SeedService],
})
export class SeedModule {}
