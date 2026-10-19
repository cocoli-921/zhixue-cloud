import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from './course.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 160 })
  title: string;

  @Column({ name: 'order_number' })
  orderNumber: number;

  @Column({ name: 'content_url', type: 'varchar', length: 500, nullable: true })
  contentUrl: string | null;

  @Column({ name: 'is_published', default: true })
  isPublished: boolean;

  @ManyToOne(() => Course, (course) => course.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @Column({ name: 'course_id' })
  courseId: number;
}
