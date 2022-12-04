import { day12a } from './a';

describe('Puzzle 12 a', () => {
  test('given example', async () => {
    expect(await day12a('data/day-12/a-test.txt')).toBe(0);
  });
});
