import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { Question } from './question.entity';
import { Submission } from './submission.entity';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Submission])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService],
})
export class QuizzesModule {}
