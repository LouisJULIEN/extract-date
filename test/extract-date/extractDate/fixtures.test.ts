import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  parse as parseDate,
} from 'date-fns';
import fixtureDates from '@test/fixtures/dates.json';
import extractDate from '@/extractDate';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

const normalizedFixtureDates = fixtureDates
  .map((fixture) => {
    return {
      ...fixture,
      subject: fixture.subject.trim(),
    };
  })
  .map((fixture) => {
    return JSON.stringify(fixture);
  })
  .filter((fixture, index, self) => {
    return self.indexOf(fixture) === index;
  })
  .map((fixture) => {
    return JSON.parse(fixture);
  })
  .map((fixture) => {
    return {
      ...fixture,
      configuration: {
        ...fixture.configuration,
        maximumAge: Infinity,
        minimumAge: Infinity,
      },
    };
  });

for (const fixtureDate of normalizedFixtureDates) {
  it('extracts dates from "' + fixtureDate.subject + '" fixture using ' + JSON.stringify(fixtureDate.configuration) + ' configuration on ' + fixtureDate.date + ' date', () => {
    vi.setSystemTime(parseDate(fixtureDate.date, 'yyyy-MM-dd', new Date()).getTime());

    expect(extractDate(fixtureDate.subject, fixtureDate.configuration)).toEqual(fixtureDate.matches);
  });
}
