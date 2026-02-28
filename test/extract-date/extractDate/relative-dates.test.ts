import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  parse as parseDate,
} from 'date-fns';
import extractDate from '../../../src/extractDate';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('does not extract relative dates when locale is undefined', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    timezone: 'Europe/London',
  };

  expect(extractDate('today', configuration)).toEqual([]);
});

it('extracts relative dates when timezone is undefined (uses local time)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'en',
  };

  expect(extractDate('today', configuration)).toEqual([{date: '2000-01-01', originalText: 'today'}]);
});

it('extracts relative date (yesterday)', () => {
  vi.setSystemTime(parseDate('2000-01-02', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'en',
    timezone: 'Europe/London',
  };

  expect(extractDate('yesterday', configuration)).toEqual([{date: '2000-01-01', originalText: 'yesterday'}]);
});

it('extracts relative date (today)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'en',
    timezone: 'Europe/London',
  };

  expect(extractDate('today', configuration)).toEqual([{date: '2000-01-01', originalText: 'today'}]);
});

it('extracts relative date (tomorrow)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'en',
    timezone: 'Europe/London',
  };

  expect(extractDate('tomorrow', configuration)).toEqual([{date: '2000-01-02', originalText: 'tomorrow'}]);
});
