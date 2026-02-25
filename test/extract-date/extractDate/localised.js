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
    translateAccentless: true,
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

test('Translation works', (t) => {
  clock.tick(parseDate('2018-01-01', 'yyyy-MM-dd', new Date()).getTime());

  t.deepEqual(extractDate('Va bene domani', {
    translateAccentless: true,
    locale: 'it',
  }), [{date: '2018-01-02', originalText: 'domani'}]);

  t.deepEqual(extractDate('Va bene domani', {
    translateAccentless: true,
    locale: 'fr',
  }), []);

  t.deepEqual(extractDate('Va bene domani', {
    translateAccentless: true,
    locale: 'en',
  }), []);
})


// Italian day names carry a grave accent (lunedì, martedì, venerdì…).
// accentless:true lets callers omit the accent and still get a match.
// 2018-02-05 is a Monday, so "lunedi 5 febbraio" unambiguously maps to that date.
test('extracts Italian date with accentless day name', (t) => {
  clock.tick(parseDate('2018-01-01', 'yyyy-MM-dd', new Date()).getTime());

  t.deepEqual(extractDate('lunedi 5 febbraio', {
    translateAccentless: true,
    locale: 'it',
  }), [{date: '2018-02-05', originalText: 'lunedi 5 febbraio'}]);

  t.deepEqual(extractDate('lunedi 5 febbraio', {
    translateAccentless: false,
    locale: 'it',
  }), [{date: '2018-02-05', originalText: '5 febbraio'}]);


  t.deepEqual(extractDate('lunedì 5 febbraio', {
    translateAccentless: true,
    locale: 'it',
  }), [{date: '2018-02-05', originalText: 'lunedi 5 febbraio'}]);


  t.deepEqual(extractDate('lunedì 5 febbraio', {
    translateAccentless: false,
    locale: 'it',
  }), [{date: '2018-02-05', originalText: 'lunedi 5 febbraio'}]);

});


