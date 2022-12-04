import { formatFiles, Tree } from '@nrwl/devkit';
import dayGenerator from '../day-generator/generator';

export default async function (tree: Tree) {
  for (let dayName = 1; dayName <= 25; dayName++) {
    await dayGenerator(tree, { dayName });
  }
  await formatFiles(tree);
}
