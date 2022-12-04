import { day1a } from './a';

describe('Day 1a', () => {
  test('given example', async () => {
    expect(await day1a('data/day-1/a-test.txt')).toBe(24000);
  });
});
