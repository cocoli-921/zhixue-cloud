import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EnrollmentStatus } from '../common/enums';
import { User } from '../users/user.entity';
import { Course } from '../courses/course.entity';
import { ProgressRecord } from '../progress/progress-record.entity';

@Entity('enrollments')
@Index(['userId', 'courseId'], { unique: true })
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'course_id' })
  courseId: number;

  @Column({ name: 'progress_percent', type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPercent: number;

  @Column({ type: 'enum', enum: EnrollmentStatus, default: EnrollmentStatus.ACTIVE })
  status: EnrollmentStatus;

  @ManyToOne(() => User, (user) => user.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToOne(() => ProgressRecord, (progress) => progress.enrollment, { cascade: true })
  progress: ProgressRecord;

  @CreateDateColumn({ name: 'enrolled_at' })
  enrolledAt: Date;
}
