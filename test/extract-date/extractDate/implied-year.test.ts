import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import moment from 'moment';
import extractDate from '../../../src/extractDate';
import type { UserConfigurationType } from '../../../src/types';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('assumes last year if month difference is greater or equal to `maximumAge`', () => {
  vi.setSystemTime(moment('2000-01-01').valueOf());

  const configuration = {
    direction: 'MD',
    maximumAge: 10,
  } satisfies UserConfigurationType;

  expect(extractDate('01-01', configuration)).toEqual([{date: '2000-01-01', originalText: '01-01'}]);
  expect(extractDate('02-01', configuration)).toEqual([{date: '2000-02-01', originalText: '02-01'}]);
  expect(extractDate('03-01', configuration)).toEqual([{date: '2000-03-01', originalText: '03-01'}]);
  expect(extractDate('04-01', configuration)).toEqual([{date: '2000-04-01', originalText: '04-01'}]);
  expect(extractDate('05-01', configuration)).toEqual([{date: '2000-05-01', originalText: '05-01'}]);
  expect(extractDate('06-01', configuration)).toEqual([{date: '2000-06-01', originalText: '06-01'}]);
  expect(extractDate('07-01', configuration)).toEqual([{date: '2000-07-01', originalText: '07-01'}]);
  expect(extractDate('08-01', configuration)).toEqual([{date: '2000-08-01', originalText: '08-01'}]);
  expect(extractDate('09-01', configuration)).toEqual([{date: '2000-09-01', originalText: '09-01'}]);
  expect(extractDate('10-01', configuration)).toEqual([{date: '2000-10-01', originalText: '10-01'}]);

  expect(extractDate('11-01', configuration)).toEqual([{date: '1999-11-01', originalText: '11-01'}]);
  expect(extractDate('12-01', configuration)).toEqual([{date: '1999-12-01', originalText: '12-01'}]);
});

it('does not assume last year when `maximumAge` is `Infinity`', () => {
  vi.setSystemTime(moment('2000-01-01').valueOf());

  const configuration = {
    direction: 'MD',
    maximumAge: Infinity,
  } satisfies UserConfigurationType;

  expect(extractDate('01-01', configuration)).toEqual([{date: '2000-01-01', originalText: '01-01'}]);
  expect(extractDate('02-01', configuration)).toEqual([{date: '2000-02-01', originalText: '02-01'}]);
  expect(extractDate('03-01', configuration)).toEqual([{date: '2000-03-01', originalText: '03-01'}]);
  expect(extractDate('04-01', configuration)).toEqual([{date: '2000-04-01', originalText: '04-01'}]);
  expect(extractDate('05-01', configuration)).toEqual([{date: '2000-05-01', originalText: '05-01'}]);
  expect(extractDate('06-01', configuration)).toEqual([{date: '2000-06-01', originalText: '06-01'}]);
  expect(extractDate('07-01', configuration)).toEqual([{date: '2000-07-01', originalText: '07-01'}]);
  expect(extractDate('08-01', configuration)).toEqual([{date: '2000-08-01', originalText: '08-01'}]);
  expect(extractDate('09-01', configuration)).toEqual([{date: '2000-09-01', originalText: '09-01'}]);
  expect(extractDate('10-01', configuration)).toEqual([{date: '2000-10-01', originalText: '10-01'}]);
  expect(extractDate('11-01', configuration)).toEqual([{date: '2000-11-01', originalText: '11-01'}]);
  expect(extractDate('12-01', configuration)).toEqual([{date: '2000-12-01', originalText: '12-01'}]);
});

it('increments year value if month difference is greater or equal to `minimumAge`', () => {
  vi.setSystemTime(moment('2000-12-01').valueOf());

  const configuration = {
    direction: 'MD',
    minimumAge: 2,
  } satisfies UserConfigurationType;

  expect(extractDate('01-01', configuration)).toEqual([{date: '2001-01-01', originalText: '01-01'}]);
  expect(extractDate('02-01', configuration)).toEqual([{date: '2001-02-01', originalText: '02-01'}]);
  expect(extractDate('03-01', configuration)).toEqual([{date: '2001-03-01', originalText: '03-01'}]);
  expect(extractDate('04-01', configuration)).toEqual([{date: '2001-04-01', originalText: '04-01'}]);
  expect(extractDate('05-01', configuration)).toEqual([{date: '2001-05-01', originalText: '05-01'}]);
  expect(extractDate('06-01', configuration)).toEqual([{date: '2001-06-01', originalText: '06-01'}]);
  expect(extractDate('07-01', configuration)).toEqual([{date: '2001-07-01', originalText: '07-01'}]);
  expect(extractDate('08-01', configuration)).toEqual([{date: '2001-08-01', originalText: '08-01'}]);
  expect(extractDate('09-01', configuration)).toEqual([{date: '2001-09-01', originalText: '09-01'}]);
  expect(extractDate('10-01', configuration)).toEqual([{date: '2001-10-01', originalText: '10-01'}]);

  expect(extractDate('11-01', configuration)).toEqual([{date: '2000-11-01', originalText: '11-01'}]);
  expect(extractDate('12-01', configuration)).toEqual([{date: '2000-12-01', originalText: '12-01'}]);
});

it('does not increment year value if `minimumAge` is `Infinity`', () => {
  vi.setSystemTime(moment('2000-12-01').valueOf());

  const configuration = {
    direction: 'MD',
    minimumAge: Infinity,
  } satisfies UserConfigurationType;

  expect(extractDate('01-01', configuration)).toEqual([{date: '2000-01-01', originalText: '01-01'}]);
  expect(extractDate('02-01', configuration)).toEqual([{date: '2000-02-01', originalText: '02-01'}]);
  expect(extractDate('03-01', configuration)).toEqual([{date: '2000-03-01', originalText: '03-01'}]);
  expect(extractDate('04-01', configuration)).toEqual([{date: '2000-04-01', originalText: '04-01'}]);
  expect(extractDate('05-01', configuration)).toEqual([{date: '2000-05-01', originalText: '05-01'}]);
  expect(extractDate('06-01', configuration)).toEqual([{date: '2000-06-01', originalText: '06-01'}]);
  expect(extractDate('07-01', configuration)).toEqual([{date: '2000-07-01', originalText: '07-01'}]);
  expect(extractDate('08-01', configuration)).toEqual([{date: '2000-08-01', originalText: '08-01'}]);
  expect(extractDate('09-01', configuration)).toEqual([{date: '2000-09-01', originalText: '09-01'}]);
  expect(extractDate('10-01', configuration)).toEqual([{date: '2000-10-01', originalText: '10-01'}]);
  expect(extractDate('11-01', configuration)).toEqual([{date: '2000-11-01', originalText: '11-01'}]);
  expect(extractDate('12-01', configuration)).toEqual([{date: '2000-12-01', originalText: '12-01'}]);
});

it('`maximumAge` and `minimumAge` can be combined', () => {
  vi.setSystemTime(moment('2000-06-01').valueOf());

  const configuration = {
    direction: 'MD',
    maximumAge: 2,
    minimumAge: 2,
  } satisfies UserConfigurationType;

  expect(extractDate('01-01', configuration)).toEqual([{date: '2001-01-01', originalText: '01-01'}]);
  expect(extractDate('02-01', configuration)).toEqual([{date: '2001-02-01', originalText: '02-01'}]);
  expect(extractDate('03-01', configuration)).toEqual([{date: '2001-03-01', originalText: '03-01'}]);
  expect(extractDate('04-01', configuration)).toEqual([{date: '2001-04-01', originalText: '04-01'}]);

  expect(extractDate('05-01', configuration)).toEqual([{date: '2000-05-01', originalText: '05-01'}]);
  expect(extractDate('06-01', configuration)).toEqual([{date: '2000-06-01', originalText: '06-01'}]);
  expect(extractDate('07-01', configuration)).toEqual([{date: '2000-07-01', originalText: '07-01'}]);

  expect(extractDate('08-01', configuration)).toEqual([{date: '1999-08-01', originalText: '08-01'}]);
  expect(extractDate('09-01', configuration)).toEqual([{date: '1999-09-01', originalText: '09-01'}]);
  expect(extractDate('10-01', configuration)).toEqual([{date: '1999-10-01', originalText: '10-01'}]);
  expect(extractDate('11-01', configuration)).toEqual([{date: '1999-11-01', originalText: '11-01'}]);
  expect(extractDate('12-01', configuration)).toEqual([{date: '1999-12-01', originalText: '12-01'}]);
});
