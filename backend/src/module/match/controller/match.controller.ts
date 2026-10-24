import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guard/role.guard';
import { Roles } from '../../decorators/roleDecorator';
import { ParseObjectIdPipe } from '../../../common/pipes/parseObjectId.pipe';
import { UserRole } from '../../../common/enum';
import { MatchesService } from '../service/match.service';
import { CreateMatchDto, UpdateMatchDto, ListMatchesQueryDto } from './dto';

type AuthedRequest = Request & { user: { userId: string; role: UserRole } };

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  @ApiOperation({
    summary: 'List published matches, optionally filtered by date',
  })
  findAll(@Query() query: ListMatchesQueryDto) {
    return this.matchesService.findPublished(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single published match by id' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.matchesService.findPublicById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: '[admin] Create a match, as DRAFT or PUBLISHED' })
  create(@Body() dto: CreateMatchDto, @Req() req: AuthedRequest) {
    return this.matchesService.create(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: '[admin] Update price, capacity, or status' })
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() dto: UpdateMatchDto,
  ) {
    return this.matchesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: '[admin] Soft-cancel a match' })
  cancel(@Param('id', ParseObjectIdPipe) id: string) {
    return this.matchesService.cancel(id);
  }
}
