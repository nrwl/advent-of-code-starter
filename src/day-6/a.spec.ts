import { day6a } from './a';

describe('Puzzle 6 a', () => {
  test('given example', async () => {
    expect(await day6a('data/day-6/a-test.txt')).toBe(0);
  });
});
