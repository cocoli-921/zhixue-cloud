import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly tasks: Repository<Task>) {}

  async list(userId: number) {
    return this.tasks.find({
      where: { userId },
      order: { dueDate: 'ASC', createdAt: 'DESC' },
    });
  }

  async create(userId: number, dto: CreateTaskDto) {
    return this.tasks.save(
      this.tasks.create({
        userId,
        title: dto.title,
        dueDate: dto.dueDate ?? null,
        completed: false,
      }),
    );
  }

  async update(userId: number, id: number, dto: UpdateTaskDto) {
    const task = await this.findOne(userId, id);
    Object.assign(task, dto);
    return this.tasks.save(task);
  }

  async remove(userId: number, id: number) {
    const task = await this.findOne(userId, id);
    await this.tasks.remove(task);
    return { message: '任务已删除' };
  }

  private async findOne(userId: number, id: number) {
    const task = await this.tasks.findOne({ where: { id, userId } });
    if (!task) throw new NotFoundException('任务不存在');
    return task;
  }
}
