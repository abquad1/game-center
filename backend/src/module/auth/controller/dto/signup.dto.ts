import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongP@ss123', minLength: 8 })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Jane', required: true })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Doe', required: true })
  lastName: string;
}
