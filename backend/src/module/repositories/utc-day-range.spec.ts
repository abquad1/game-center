import { describe, expect, it } from 'vitest';
import { getUtcDayRange } from './utc-day-range';

describe('getUtcDayRange', () => {
  it('returns UTC midnight to the next UTC midnight', () => {
    const { start, end } = getUtcDayRange('2026-10-04');

    expect(start.toISOString()).toBe('2026-10-04T00:00:00.000Z');
    expect(end.toISOString()).toBe('2026-10-05T00:00:00.000Z');
  });
});
