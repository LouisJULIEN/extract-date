// @flow

import test, {
  afterEach,
  beforeEach,
} from 'ava';
import sinon from 'sinon';
import {
  parse as parseDate,
} from 'date-fns';
import extractDate from '../../../src/extractDate';

let clock;

beforeEach(() => {
  clock = sinon.useFakeTimers();
});

afterEach(() => {
  clock.restore();
});

test('extracts a localised date (English)', (t) => {
  clock.tick(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'en',
  };

  t.deepEqual(extractDate('May 1, 2017', configuration), [{date: '2017-05-01', originalText: 'May 1, 2017'}]);
});

test('extracts a localised date (French)', (t) => {
  clock.tick(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'fr',
  };

  t.deepEqual(extractDate('Mai 1, 2017', configuration), [{date: '2017-05-01', originalText: 'Mai 1, 2017'}]);
});

test('extracts a localised date with accentless mode (French)', (t) => {
  clock.tick(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    accentless: true,
    locale: 'fr',
  };

  t.deepEqual(extractDate('fevrier 1, 2017', configuration), [{date: '2017-02-01', originalText: 'fevrier 1, 2017'}]);
});

test('extracts a localised date for a non-date-fns locale (Afrikaans)', (t) => {
  clock.tick(parseDate('2000-01-01', 'yyyy-MM-dd', new Date()).getTime());

  const configuration = {
    locale: 'af',
  };

  t.deepEqual(extractDate('Januarie 1, 2017', configuration), [{date: '2017-01-01', originalText: 'Januarie 1, 2017'}]);
});
