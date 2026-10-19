import { Module } from '@nestjs/common';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { ProgressController } from './progress.controller';

@Module({
  imports: [EnrollmentsModule],
  controllers: [ProgressController],
})
export class ProgressModule {}
