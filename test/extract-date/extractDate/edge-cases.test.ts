import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  parse as parseDate,
} from 'date-fns';
import extractDate from '@/extractDate';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('parses ISO 8601 date-time format', () => {
  vi.setSystemTime(parseDate('2000-01-02', 'yyyy-MM-dd', new Date()).getTime());

  expect(extractDate('2000-01-02T00:00')).toEqual([{date: '2000-01-02', originalText: '2000-01-02'}]);
});

it('extracts date matching multiple formats once', () => {
  vi.setSystemTime(parseDate('2000-01-02', 'yyyy-MM-dd', new Date()).getTime());

  // 'foo bar' prefix is required to ensure that substring matching is correctly advancing.
  expect(extractDate('foo bar 02/01/2000', {direction: 'DMY'})).toEqual([{date: '2000-01-02', originalText: '02/01/2000'}]);
});

it('full-year formats are used regardless of whether direction defines Y', () => {
  vi.setSystemTime(parseDate('2000-01-02', 'yyyy-MM-dd', new Date()).getTime());

  expect(extractDate('02/01/2020', {direction: 'DM'})).toEqual([{date: '2020-01-02', originalText: '02/01/2020'}]);
});

it.todo('interprets 24:00 time as the next date');
