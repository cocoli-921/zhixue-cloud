import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { User } from '../users/user.entity';

@Entity('quiz_submissions')
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'quiz_id' })
  quizId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'int', default: 0 })
  score: number;

  @Column({ type: 'int', default: 0 })
  total: number;

  @Column({ type: 'json', nullable: true })
  answers: string[] | null;

  @Column({ type: 'text', nullable: true })
  feedback: string | null;

  @ManyToOne(() => Quiz, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
