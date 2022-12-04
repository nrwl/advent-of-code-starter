import { day4a } from './a';

describe('Puzzle 4 a', () => {
  test('given example', async () => {
    expect(await day4a('data/day-4/a-test.txt')).toBe(0);
  });
});
