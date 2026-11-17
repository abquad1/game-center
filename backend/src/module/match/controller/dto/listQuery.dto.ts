import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, Matches } from 'class-validator';

export class ListMatchesQueryDto {
  @ApiPropertyOptional({
    example: '2026-10-04',
    description: 'Filter to matches on this calendar date',
  })
  @IsOptional()
  @IsDateString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  date?: string;
}
