import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({ example: 'Arsenal' })
  @IsNotEmpty()
  @IsString()
  homeTeam: string;

  @ApiProperty({ example: 'Chelsea' })
  @IsNotEmpty()
  @IsString()
  awayTeam: string;

  @ApiProperty({ example: 'Premier League' })
  @IsNotEmpty()
  @IsString()
  competition: string;

  @ApiProperty({ example: '2026-10-04T15:00:00.000Z' })
  @IsDateString()
  kickoffTime: string;

  @ApiProperty({ example: 2000, minimum: 0 })
  @IsNumber()
  @Min(0)
  pricePerSeat: number;

  @ApiProperty({ example: 50, minimum: 1 })
  @IsInt()
  @Min(1)
  totalSeats: number;

  @ApiPropertyOptional({
    description: 'Reference id from an external fixtures source, if synced',
  })
  @IsOptional()
  @IsString()
  externalFixtureId?: string;

  @ApiPropertyOptional({
    description:
      'If true (the default), create the match as PUBLISHED. Set false to save as a DRAFT.',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  publish?: boolean;
}
