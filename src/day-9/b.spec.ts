import { day9b } from './b';

describe('Puzzle 9 b', () => {
  test('given example', async () => {
    expect(await day9b('data/day-9/b-test.txt')).toBe(0);
  });
});
