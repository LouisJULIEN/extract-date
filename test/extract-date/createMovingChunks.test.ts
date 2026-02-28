import { it, expect } from 'vitest';
import createMovingChunks from '../../src/createMovingChunks';

it('creates an array of fixed length text slices, each offset by 1 character', () => {
  expect(createMovingChunks(['a', 'b', 'c', 'd'], 2)).toEqual([
    [
      'a',
      'b',
    ],
    [
      'b',
      'c',
    ],
    [
      'c',
      'd',
    ],
  ]);

  expect(createMovingChunks(['a', 'b', 'c'], 2)).toEqual([
    [
      'a',
      'b',
    ],
    [
      'b',
      'c',
    ],
  ]);
});
