import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuizStatus } from '../common/enums';
import { Question } from './question.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 160 })
  title: string;

  @Column({ name: 'course_id', type: 'int', nullable: true })
  courseId: number | null;

  @Column({ type: 'enum', enum: QuizStatus, default: QuizStatus.DRAFT })
  status: QuizStatus;

  @OneToMany(() => Question, (q) => q.quiz, { cascade: true })
  questions: Question[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
