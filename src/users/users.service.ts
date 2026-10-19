import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { UserRole, UserStatus } from '../common/enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Enrollment) private readonly enrollments: Repository<Enrollment>,
  ) {}

  private sanitize(user: User) {
    const { passwordHash: _passwordHash, ...safe } = user;
    return safe;
  }

  async list() {
    const users = await this.users.find({ order: { createdAt: 'DESC' } });
    return users.map((u) => this.sanitize(u));
  }

  async create(dto: CreateUserDto) {
    const exists = await this.users.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('邮箱已被注册');
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.users.save(
      this.users.create({
        name: dto.name,
        email: dto.email,
        passwordHash,
        role: dto.role,
        status: UserStatus.ACTIVE,
      }),
    );
    return this.sanitize(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (dto.email && dto.email !== user.email) {
      const exists = await this.users.findOne({ where: { email: dto.email } });
      if (exists) throw new ConflictException('邮箱已被注册');
    }
    Object.assign(user, dto);
    await this.users.save(user);
    return this.sanitize(user);
  }

  async updateStatus(id: number, dto: UpdateUserStatusDto) {
    const user = await this.findOne(id);
    user.status = dto.status;
    await this.users.save(user);
    return this.sanitize(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.users.remove(user);
    return { message: '用户已删除' };
  }

  async listStudents() {
    const students = await this.users.find({
      where: { role: UserRole.STUDENT },
      order: { createdAt: 'ASC' },
    });
    const enrollments = await this.enrollments.find({
      relations: { course: true, progress: true },
      order: { enrolledAt: 'DESC' },
    });
    return students.map((s) => {
      const enrolls = enrollments.filter((e) => e.userId === s.id);
      const latest = enrolls[0];
      return {
        userId: s.id,
        name: s.name,
        email: s.email,
        courseTitle: latest ? latest.course.title : '暂无课程',
        progressPercent: latest ? Number(latest.progressPercent) : 0,
        completedLessons: latest ? Number(latest.progress?.completedLessons ?? 0) : 0,
        totalLessons: latest ? Number(latest.progress?.totalLessons ?? 0) : 0,
        lastStudyAt: latest?.progress?.lastStudyAt ?? null,
      };
    });
  }

  private async findOne(id: number) {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }
}
