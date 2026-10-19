import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  dueDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
