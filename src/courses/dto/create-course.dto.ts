import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'HTML/CSS 网页设计入门' })
  @IsString()
  title: string;
  @ApiProperty({ example: '从标签、选择器到响应式页面' })
  @IsString()
  description: string;
  @ApiProperty({ example: ['HTML', 'CSS', '前端'] })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  price: number;
  @ApiProperty({ example: 4.8, required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;
}
