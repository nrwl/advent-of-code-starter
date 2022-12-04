import { day5b } from './b';

describe('Puzzle 5 b', () => {
  test('given example', async () => {
    expect(await day5b('data/day-5/b-test.txt')).toBe(0);
  });
});
