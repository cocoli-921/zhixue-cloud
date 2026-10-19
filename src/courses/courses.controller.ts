import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../common/enums';
import { CurrentUser, Roles } from '../common/auth.decorators';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly courses: CoursesService) {}
  @ApiQuery({ name: 'search', required: false })
  @Get()
  list(@Query('search') search?: string) { return this.courses.list(search); }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Get('admin')
  listAll() { return this.courses.listAll(); }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) { return this.courses.findOne(id); }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Post()
  create(@Body() dto: CreateCourseDto, @CurrentUser() user: { role: UserRole }) {
    this.courses.ensureCanManage(user); return this.courses.create(dto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCourseDto, @CurrentUser() user: { role: UserRole }) {
    this.courses.ensureCanManage(user); return this.courses.update(id, dto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Post(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { role: UserRole }) {
    this.courses.ensureCanManage(user); return this.courses.publish(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Post(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { role: UserRole }) {
    this.courses.ensureCanManage(user); return this.courses.reject(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Post(':id/archive')
  archive(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: { role: UserRole }) {
    this.courses.ensureCanManage(user); return this.courses.archive(id);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @Post(':id/lessons')
  addLesson(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateLessonDto, @CurrentUser() user: { role: UserRole }) {
    this.courses.ensureCanManage(user); return this.courses.addLesson(id, dto);
  }
}
