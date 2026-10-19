import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from '../enrollments/enrollment.entity';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
