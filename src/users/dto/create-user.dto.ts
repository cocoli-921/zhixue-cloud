import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from '../../common/enums';

export class CreateUserDto {
  @ApiProperty({ example: '林同学' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'student@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123!' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.STUDENT })
  @IsEnum(UserRole)
  role: UserRole;
}
