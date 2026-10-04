import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { MatchStatus } from '../../../../common/enum';

export class UpdateMatchDto {
  @ApiPropertyOptional({ example: 2500, minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  pricePerSeat?: number;

  @ApiPropertyOptional({ example: 60, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  totalSeats?: number;

  @ApiPropertyOptional({ enum: MatchStatus })
  @IsOptional()
  @IsEnum(MatchStatus)
  status?: MatchStatus;
}
