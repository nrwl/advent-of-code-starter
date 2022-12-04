import { day10a } from './a';

describe('Puzzle 10 a', () => {
  test('given example', async () => {
    expect(await day10a('data/day-10/a-test.txt')).toBe(0);
  });
});
