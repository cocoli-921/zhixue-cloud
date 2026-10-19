import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';

@Entity('progress_records')
export class ProgressRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'enrollment_id', unique: true })
  enrollmentId: number;

  @Column({ name: 'completed_lessons', default: 0 })
  completedLessons: number;

  @Column({ name: 'total_lessons', default: 0 })
  totalLessons: number;

  @Column({ name: 'progress_percent', type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPercent: number;

  @Column({ name: 'last_study_at', type: 'datetime', nullable: true })
  lastStudyAt: Date | null;

  @OneToOne(() => Enrollment, (enrollment) => enrollment.progress, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
