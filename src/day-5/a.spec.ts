import { day5a } from './a';

describe('Puzzle 5 a', () => {
  test('given example', async () => {
    expect(await day5a('data/day-5/a-test.txt')).toBe(0);
  });
});
