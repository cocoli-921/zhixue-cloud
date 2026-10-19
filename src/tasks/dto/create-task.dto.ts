import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: '完成第 16 课视频' })
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: '2026-10-19' })
  @IsOptional()
  @IsString()
  dueDate?: string;
}
