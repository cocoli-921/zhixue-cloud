import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class UpdateProgressDto {
  @ApiProperty({ example: 4 })
  @IsInt()
  @Min(0)
  completedLessons: number;
}
