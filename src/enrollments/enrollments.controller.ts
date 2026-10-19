import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/auth.decorators';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { EnrollmentsService } from './enrollments.service';
import { UpdateProgressDto } from './dto/update-progress.dto';

@ApiTags('enrollments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollments: EnrollmentsService) {}

  @Post('/courses/:courseId')
  enroll(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: { id: number },
  ) {
    return this.enrollments.enroll(user.id, courseId);
  }

  @Get('me')
  mine(@CurrentUser() user: { id: number }) {
    return this.enrollments.listMine(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { id: number }) {
    return this.enrollments.findOne(user.id, id);
  }

  @Patch(':id/progress')
  updateProgress(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProgressDto,
    @CurrentUser() user: { id: number },
  ) {
    return this.enrollments.updateProgress(user.id, id, dto);
  }
}
