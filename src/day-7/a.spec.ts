import { day7a } from './a';

describe('Puzzle 7 a', () => {
  test('given example', async () => {
    expect(await day7a('data/day-7/a-test.txt')).toBe(0);
  });
});
