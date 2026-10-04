import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class ListMatchesQueryDto {
  @ApiPropertyOptional({
    example: '2026-10-04',
    description: 'Filter to matches on this calendar date',
  })
  @IsOptional()
  @IsDateString()
  date?: string;
}
