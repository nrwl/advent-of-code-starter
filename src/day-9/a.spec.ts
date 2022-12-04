import { day9a } from './a';

describe('Puzzle 9 a', () => {
  test('given example', async () => {
    expect(await day9a('data/day-9/a-test.txt')).toBe(0);
  });
});
