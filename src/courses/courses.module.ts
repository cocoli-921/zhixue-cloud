import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
@Module({
  imports: [TypeOrmModule.forFeature([Course, Lesson])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
