import { readData } from '../utils';
import chalk from 'chalk';

export async function day11b(dataPath?: string) {
  const data = await readData(dataPath);
  return 0;
}

// don't change below this line
// this makes sure we don't call the function when we import it for tests
if (process.argv.includes('--run')) {
  day11b().then((answer) => {
    console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
  });
}
