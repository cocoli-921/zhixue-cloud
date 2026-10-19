import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class QuestionDto {
  @ApiProperty({ example: '网页中用来描述页面结构的基础元素是？' })
  @IsString()
  content: string;

  @ApiProperty({ example: ['HTML 标签', 'CSS 选择器', 'JavaScript 函数'] })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @ApiProperty({ example: 'A' })
  @IsString()
  answer: string;
}

export class CreateQuizDto {
  @ApiProperty({ example: '网页基础知识测验' })
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  courseId?: number;

  @ApiProperty({ type: [QuestionDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}
