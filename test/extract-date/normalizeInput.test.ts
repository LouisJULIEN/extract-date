import { it, expect } from 'vitest';
import normalizeInput from '@/normalizeInput';

it('splits yyyy-MM-ddTHH:mm', () => {
  expect(normalizeInput('2018-01-01T14:00 2018-01-02T15:00')).toBe('2018-01-01 14:00 2018-01-02 15:00');
});

it('removes spaces between date-like fragments separated by /', () => {
  expect(normalizeInput('10 / 20 / 30')).toBe('10/20/30');
});

it('removes repeating white space', () => {
  expect(normalizeInput('foo    bar  baz')).toBe('foo bar baz');
});

it('trims white space', () => {
  expect(normalizeInput('  foo  ')).toBe('foo');
});
