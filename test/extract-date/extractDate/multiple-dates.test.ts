import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  addDays,
  format as formatDate,
  parse as parseDate,
} from 'date-fns';
import extractDate from '@/extractDate';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('extracts multiple dates', () => {
  vi.setSystemTime(parseDate('2000-06-01', 'yyyy-MM-dd', new Date()).valueOf());

  const actual = extractDate(formatDate(new Date(), 'yyyy-MM-dd') + ' ' + formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'));
  const expected = [
    {
      date: formatDate(new Date(), 'yyyy-MM-dd'),
      originalText: formatDate(new Date(), 'yyyy-MM-dd'),
    },
    {
      date: formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'),
      originalText: formatDate(addDays(new Date(), 1), 'yyyy-MM-dd'),
    },
  ];

  expect(actual).toEqual(expected);
});
