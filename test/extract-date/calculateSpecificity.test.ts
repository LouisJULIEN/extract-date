import { it, expect } from 'vitest';
import cartesian from 'cartesian';
import calculateSpecificity from '../../src/calculateSpecificity';

it('tokens including yyyy, (MMMM, MM, MM, M), (dd, d, do) have the highest specificity', () => {
  const formats = cartesian([
    [
      'yyyy',
    ],
    [
      'MMMM',
      'MMM',
      'MM',
      'M',
    ],
    [
      'dd',
      'd',
      'do',
    ],
  ]);

  for (const tokens of formats) {
    const format = tokens.join(' ');

    expect(calculateSpecificity(format)).toBe(80 + format.length);
  }
});

it('tokens without year, month or month date have the lowest specificity', () => {
  const formats = [
    'EEEE',
    'EEE',
    'R',
  ];

  for (const format of formats) {
    expect(calculateSpecificity(format)).toBe(format.length);
  }
});

it('adds format length to the specificity', () => {
  expect(calculateSpecificity('xxxx')).toBe(4);
  expect(calculateSpecificity('xx')).toBe(2);
});
