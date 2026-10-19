import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FeedbackDto {
  @ApiProperty({ example: '整体掌握良好，注意语义化标签。' })
  @IsString()
  feedback: string;
}
