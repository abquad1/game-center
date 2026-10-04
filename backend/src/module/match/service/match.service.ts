import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  CreateMatchDto,
  UpdateMatchDto,
  ListMatchesQueryDto,
} from '../controller/dto';
import { MatchesRepository } from '../../repositories/match.repsoitory';
import { MatchStatus } from '../../../common/enum';

// import { handleErrors } from '../../common/utils/handle-errors.util';

@Injectable()
export class MatchesService {
  constructor(private readonly matchesRepository: MatchesRepository) {}

  async create(dto: CreateMatchDto, createdBy?: string) {
    const match = await this.matchesRepository.create({
      homeTeam: dto.homeTeam,
      awayTeam: dto.awayTeam,
      competition: dto.competition,
      kickoffTime: new Date(dto.kickoffTime),
      pricePerSeat: dto.pricePerSeat,
      totalSeats: dto.totalSeats,
      availableSeats: dto.totalSeats, // starts fully available — no seats sold yet
      status: dto.publish ? MatchStatus.PUBLISHED : MatchStatus.DRAFT,
      externalFixtureId: dto.externalFixtureId,
      createdBy: createdBy as any,
    });
    return match;
  }

  // Public listing — always routes through findPublished, which hardcodes
  // status: PUBLISHED at the repository level. This service method never
  // accepts or forwards a client-supplied status.
  async findPublished(query: ListMatchesQueryDto) {
    const matches = await this.matchesRepository.findPublished({
      date: query.date,
    });
    return matches.map((m) => ({
      id: m.id,
      homeTeam: m.homeTeam,
      awayTeam: m.awayTeam,
      kickoffTime: m.kickoffTime,
      pricePerSeat: m.pricePerSeat,
      availableSeats: m.availableSeats,
      totalSeats: m.totalSeats,
    }));
  }

  async findPublicById(id: string) {
    const match = await this.matchesRepository.findById(id);
    if (!match || match.status !== MatchStatus.PUBLISHED) {
      throw new NotFoundException('Match not found');
    }
    return match;
  }

  async update(id: string, dto: UpdateMatchDto) {
    const existing = await this.matchesRepository.findById(id);
    if (!existing) throw new NotFoundException('Match not found');

    const updates: Record<string, unknown> = { ...dto };

    // If totalSeats is changing, availableSeats must move by the same
    // delta so the "seats already booked" count stays correct. Reducing
    // capacity below what's already booked would silently oversell — reject it.
    if (
      dto.totalSeats !== undefined &&
      dto.totalSeats !== existing.totalSeats
    ) {
      const alreadyBooked = existing.totalSeats - existing.availableSeats;
      if (dto.totalSeats < alreadyBooked) {
        throw new BadRequestException(
          `Cannot reduce totalSeats below ${alreadyBooked} — that many seats are already booked`,
        );
      }
      updates.availableSeats = dto.totalSeats - alreadyBooked;
    }

    const updated = await this.matchesRepository.updateById(id, updates);
    if (!updated) throw new NotFoundException('Match not found');
    return updated;
  }

  // Soft cancel — never a hard delete. Existing Bookings/Tickets referencing
  // this match must still resolve; a deleted Match document would break that.
  async cancel(id: string) {
    const updated = await this.matchesRepository.updateById(id, {
      status: MatchStatus.CANCELLED,
    });
    if (!updated) throw new NotFoundException('Match not found');
    return { status: updated.status };
  }
}
