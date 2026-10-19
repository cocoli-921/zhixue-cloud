import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from '../courses/course.entity';
import { ProgressRecord } from '../progress/progress-record.entity';
import { Enrollment } from './enrollment.entity';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Course, ProgressRecord])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
