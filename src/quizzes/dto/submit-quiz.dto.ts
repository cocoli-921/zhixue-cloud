import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class SubmitQuizDto {
  @ApiProperty({ example: ['A', 'B', 'A'] })
  @IsArray()
  @IsString({ each: true })
  answers: string[];
}
