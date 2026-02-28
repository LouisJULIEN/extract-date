import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  format as formatDate,
  parse as parseDate,
} from 'date-fns';
import extractDate from '../../../src/extractDate';
import createFormats from '../../../src/createFormats';
import type { UserConfigurationType, DirectionType } from '../../../src/types';

// https://en.wikipedia.org/wiki/Date_format_by_country
// %w arbitrary white-space separated text

const describeConfiguration = (userConfiguration: UserConfigurationType) => {
  const configuration: { direction?: DirectionType } = {};

  if (userConfiguration.direction) {
    configuration.direction = userConfiguration.direction;
  }

  return JSON.stringify(configuration);
};

const formats = createFormats();

vi.useFakeTimers();
vi.setSystemTime(parseDate('2000-06-01', 'yyyy-MM-dd', new Date()).getTime());

const subjects = formats
  .filter((format) => {
    return format.test !== false;
  })
  .map((format) => {
    const currentDate = new Date();

    return {
      date: formatDate(currentDate, 'yyyy-MM-dd'),
      dateFnsFormat: format.dateFnsFormat,
      direction: format.direction as DirectionType | undefined,
      input: formatDate(currentDate, format.dateFnsFormat),
    };
  });

vi.useRealTimers();

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

for (const subject of subjects) {
  it('extracts ' + subject.dateFnsFormat + ' from "' + subject.input + '" input using ' + describeConfiguration(subject) + ' configuration', () => {
    vi.setSystemTime(parseDate('2000-06-01', 'yyyy-MM-dd', new Date()).getTime());

    const actual = extractDate(subject.input, subject as UserConfigurationType);
    const expected = subject.date;

    expect(actual.length).toBe(1);
    expect(actual[0].date).toBe(expected);
  });
}
