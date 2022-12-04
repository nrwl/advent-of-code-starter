import { day11a } from './a';

describe('Puzzle 11 a', () => {
  test('given example', async () => {
    expect(await day11a('data/day-11/a-test.txt')).toBe(0);
  });
});
