import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Enrollment) private readonly enrollments: Repository<Enrollment>,
  ) {}

  async mine(userId: number) {
    const enrollments = await this.enrollments.find({
      where: { userId },
      relations: { course: true, progress: true },
    });
    const completedLessons = enrollments.reduce(
      (sum, e) => sum + Number(e.progress?.completedLessons ?? 0),
      0,
    );
    const totalLessons = enrollments.reduce(
      (sum, e) => sum + Number(e.progress?.totalLessons ?? e.course.lessons?.length ?? 0),
      0,
    );
    const progressPercent =
      totalLessons === 0
        ? 0
        : Number(((completedLessons / totalLessons) * 100).toFixed(2));
    const points = enrollments.reduce(
      (sum, e) => sum + Math.round(Number(e.progressPercent) * 10),
      0,
    );
    return {
      courseCount: enrollments.length,
      completedLessons,
      totalLessons,
      progressPercent,
      streakDays: enrollments.length > 0 ? 1 : 0,
      points,
      studyHours: Number((completedLessons * 0.5).toFixed(1)),
    };
  }
}
