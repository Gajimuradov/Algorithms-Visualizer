import { describe, expect, it } from 'vitest';
import { parseNumberList, parseSortedNumberList } from './numberInput';

describe('number input parsers', () => {
  it('falls back for blank or fully invalid input', () => {
    const fallback = [3, 1, 2];

    expect(parseNumberList('', fallback)).toEqual(fallback);
    expect(parseNumberList('   , ;  ', fallback)).toEqual(fallback);
    expect(parseNumberList('one, two, NaN', fallback)).toEqual(fallback);
  });

  it('keeps valid numbers and ignores invalid tokens', () => {
    expect(parseNumberList('10, nope, 5; bad 2', [])).toEqual([10, 5, 2]);
  });

  it('sorts parsed values for binary search input', () => {
    expect(parseSortedNumberList('8, 3, invalid, 3, 1', [])).toEqual([1, 3, 3, 8]);
  });
});
