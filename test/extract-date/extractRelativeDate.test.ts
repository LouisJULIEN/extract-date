import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import moment from 'moment';
import extractRelativeDate from '@/extractRelativeDate';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('extracts relative date (yesterday)', () => {
  vi.setSystemTime(moment('2018-07-08').valueOf());

  expect(extractRelativeDate('yesterday', 'en', 'Europe/London')).toBe('2018-07-07');
});

it('extracts relative date (today)', () => {
  vi.setSystemTime(moment('2018-07-08').valueOf());

  expect(extractRelativeDate('today', 'en', 'Europe/London')).toBe('2018-07-08');
});

it('extracts relative date (tomorrow)', () => {
  vi.setSystemTime(moment('2018-07-08').valueOf());

  expect(extractRelativeDate('tomorrow', 'en', 'Europe/London')).toBe('2018-07-09');
});

it('supports different locales', () => {
  vi.setSystemTime(moment('2018-07-08').valueOf());

  expect(extractRelativeDate('rytoj', 'lt', 'Europe/London')).toBe('2018-07-09');
});

it('returns null when date cannot be recognized', () => {
  vi.setSystemTime(moment('2018-07-08').valueOf());

  expect(extractRelativeDate('foo', 'en', 'Europe/London')).toBe(null);
});
