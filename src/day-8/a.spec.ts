import { day8a } from './a';

describe('Puzzle 8 a', () => {
  test('given example', async () => {
    expect(await day8a('data/day-8/a-test.txt')).toBe(0);
  });
});
