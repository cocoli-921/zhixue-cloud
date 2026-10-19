import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';
export class CreateLessonDto {
  @ApiProperty({ example: 'HTML 文档结构' })
  @IsString()
  title: string;
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  orderNumber: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contentUrl?: string;
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
