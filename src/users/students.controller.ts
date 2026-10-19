import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRole } from '../common/enums';
import { Roles } from '../common/auth.decorators';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RolesGuard } from '../common/roles.guard';
import { UsersService } from './users.service';

@ApiTags('students')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
@Controller('students')
export class StudentsController {
  constructor(private readonly users: UsersService) {}

  @Get()
  list() {
    return this.users.listStudents();
  }
}
