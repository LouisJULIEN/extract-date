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

it('extracts a localised date (English)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'en',
  };

  expect(extractDate('May 1, 2017', configuration)).toEqual([{date: '2017-05-01', originalText: 'May 1, 2017'}]);
});

it('extracts a localised date (French)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'fr',
  };

  expect(extractDate('Mai 1, 2017', configuration)).toEqual([{date: '2017-05-01', originalText: 'Mai 1, 2017'}]);
});

it('extracts a localised date with accentless mode (French)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    translateAccentless: true,
    locale: 'fr',
  };

  expect(extractDate('fevrier 1, 2017', configuration)).toEqual([{date: '2017-02-01', originalText: 'fevrier 1, 2017'}]);
});

it('extracts a localised date for a non-date-fns locale (Afrikaans)', () => {
  vi.setSystemTime(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'af',
  };

  expect(extractDate('Januarie 1, 2017', configuration)).toEqual([{date: '2017-01-01', originalText: 'Januarie 1, 2017'}]);
});

it('Translation works', () => {
  vi.setSystemTime(parseDate('2018-01-01', 'yyyy-MM-dd', new Date()).getTime());

  expect(extractDate('Va bene domani', {
    translateAccentless: true,
    locale: 'it',
  })).toEqual([{date: '2018-01-02', originalText: 'domani'}]);

  expect(extractDate('Va bene domani', {
    translateAccentless: true,
    locale: 'fr',
  })).toEqual([]);

  expect(extractDate('Va bene domani', {
    translateAccentless: true,
    locale: 'en',
  })).toEqual([]);
});

// Italian day names carry a grave accent (lunedì, martedì, venerdì…).
// accentless:true lets callers omit the accent and still get a match.
// 2018-02-05 is a Monday, so "lunedi 5 febbraio" unambiguously maps to that date.
it('extracts Italian date with accentless day name', () => {
  vi.setSystemTime(parseDate('2018-01-01', 'yyyy-MM-dd', new Date()).getTime());

  expect(extractDate('lunedi 5 febbraio', {
    translateAccentless: true,
    locale: 'it',
  })).toEqual([{date: '2018-02-05', originalText: 'lunedi 5 febbraio'}]);

  expect(extractDate('lunedi 5 febbraio', {
    translateAccentless: false,
    locale: 'it',
  })).toEqual([{date: '2018-02-05', originalText: '5 febbraio'}]);

  expect(extractDate('lunedì 5 febbraio', {
    translateAccentless: true,
    locale: 'it',
  })).toEqual([{date: '2018-02-05', originalText: 'lunedi 5 febbraio'}]);

  expect(extractDate('lunedì 5 febbraio', {
    translateAccentless: false,
    locale: 'it',
  })).toEqual([{date: '2018-02-05', originalText: 'lunedi 5 febbraio'}]);
});
