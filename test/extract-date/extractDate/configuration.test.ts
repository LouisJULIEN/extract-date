import { it, expect, beforeEach, afterEach, vi } from 'vitest';
import extractDate from '@/extractDate';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

it('throws an error if invalid `locale` is provided', () => {
  expect(() => {
    extractDate('foo', {
      locale: 'bar',
    });
  }).toThrow('No translation available for the target locale.');
});

it('throws an error if invalid `timezone` is provided', () => {
  expect(() => {
    extractDate('foo', {
      timezone: 'bar',
    });
  }).toThrow('Unrecognized timezone.');
});

it('throws an error if invalid `maximumAge` is a negative value', () => {
  expect(() => {
    extractDate('foo', {
      maximumAge: -1,
    });
  }).toThrow('`maximumAge` must be a positive number.');
});

it('throws an error if invalid `minimumAge` is a negative value', () => {
  expect(() => {
    extractDate('foo', {
      minimumAge: -1,
    });
  }).toThrow('`minimumAge` must be a positive number.');
});
