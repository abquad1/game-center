export interface RawFixture {
  externalId: string; // the provider's own fixture id, as a string regardless of how they typed it
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  competition: string;
  kickoffTime: Date; // already parsed — nothing downstream should ever parse a date string itself
}

export interface FixtureProvider {
  getUpcomingFixtures(): Promise<RawFixture[]>;
}

export const FIXTURE_PROVIDER = 'FIXTURE_PROVIDER';
