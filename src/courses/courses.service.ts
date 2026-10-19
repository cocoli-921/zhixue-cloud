import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Course } from './course.entity';
import { Lesson } from './lesson.entity';
import { CourseStatus, UserRole } from '../common/enums';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private readonly courses: Repository<Course>,
    @InjectRepository(Lesson) private readonly lessons: Repository<Lesson>,
  ) {}

  async list(search?: string) {
    const base: FindOptionsWhere<Course> = { status: CourseStatus.PUBLISHED };
    const options = { relations: { lessons: true }, order: { createdAt: 'DESC' as const } };
    if (search) {
      const like = '%' + search + '%';
      return this.courses.find({
        where: [
          { ...base, title: Like(like) },
          { ...base, description: Like(like) },
          { ...base, tags: Like(like) },
        ],
        ...options,
      });
    }
    return this.courses.find({ where: base, ...options });
  }

  async findOne(id: number) {
    const course = await this.courses.findOne({ where: { id }, relations: { lessons: true } });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async create(dto: CreateCourseDto) {
    return this.courses.save(this.courses.create({
      title: dto.title, description: dto.description, tags: dto.tags.join(','),
      price: dto.price, rating: dto.rating ?? 0, status: CourseStatus.DRAFT,
    }));
  }

  async update(id: number, dto: UpdateCourseDto) {
    const course = await this.findOne(id);
    Object.assign(course, {
      ...dto,
      tags: dto.tags ? dto.tags.join(',') : course.tags,
    });
    return this.courses.save(course);
  }

  async publish(id: number) {
    const course = await this.findOne(id);
    course.status = CourseStatus.PUBLISHED;
    return this.courses.save(course);
  }

  async listAll() {
    return this.courses.find({
      relations: { lessons: true },
      order: { createdAt: 'DESC' },
    });
  }

  async reject(id: number) {
    const course = await this.findOne(id);
    course.status = CourseStatus.DRAFT;
    return this.courses.save(course);
  }

  async archive(id: number) {
    const course = await this.findOne(id);
    course.status = CourseStatus.ARCHIVED;
    return this.courses.save(course);
  }

  async addLesson(courseId: number, dto: CreateLessonDto) {
    await this.findOne(courseId);
    return this.lessons.save(this.lessons.create({
      ...dto, courseId, contentUrl: dto.contentUrl ?? null, isPublished: dto.isPublished ?? true,
    }));
  }

  ensureCanManage(user: { role: UserRole }) {
    if (![UserRole.ADMIN, UserRole.INSTRUCTOR].includes(user.role)) {
      throw new ForbiddenException('Instructor or admin role required');
    }
  }
}
