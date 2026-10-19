import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/auth.decorators';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasks: TasksService) {}

  @Get()
  list(@CurrentUser() user: { id: number }) {
    return this.tasks.list(user.id);
  }

  @Post()
  create(@CurrentUser() user: { id: number }, @Body() dto: CreateTaskDto) {
    return this.tasks.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: { id: number },
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasks.update(user.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: { id: number }, @Param('id', ParseIntPipe) id: number) {
    return this.tasks.remove(user.id, id);
  }
}
