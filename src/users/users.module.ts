import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Enrollment } from '../enrollments/enrollment.entity';
import { UsersController } from './users.controller';
import { StudentsController } from './students.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Enrollment])],
  controllers: [UsersController, StudentsController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
