import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/auth.decorators';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { EnrollmentsService } from '../enrollments/enrollments.service';

@ApiTags('progress')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('progress')
export class ProgressController {
  constructor(private readonly enrollments: EnrollmentsService) {}

  @Get('me')
  async mine(@CurrentUser() user: { id: number }) {
    const enrollments = await this.enrollments.listMine(user.id);
    const completedLessons = enrollments.reduce(
      (sum, item) => sum + Number(item.progress?.completedLessons ?? 0),
      0,
    );
    const totalLessons = enrollments.reduce(
      (sum, item) => sum + Number(item.progress?.totalLessons ?? item.course.lessons.length),
      0,
    );
    return {
      completedLessons,
      totalLessons,
      progressPercent: totalLessons === 0
        ? 0
        : Number(((completedLessons / totalLessons) * 100).toFixed(2)),
      courses: enrollments,
    };
  }
}
