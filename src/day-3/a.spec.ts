import { day3a } from './a';

describe('Puzzle 3 a', () => {
  test('given example', async () => {
    expect(await day3a('data/day-3/a-test.txt')).toBe(0);
  });
});
