import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nrwl/devkit';
import { readNxJson } from 'nx/src/generators/utils/project-configuration';
import * as path from 'path';
import { DayGeneratorGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: DayGeneratorGeneratorSchema
) {
  addTargets(tree, options.dayName);
  addCacheableOperations(tree, options.dayName);
  addFiles(tree, options);
  await formatFiles(tree);
}

function addTargets(tree: Tree, dayName: string) {
  const projectConfig = readProjectConfiguration(
    tree,
    'advent-of-code-starter'
  );
  const buildATarget = {
    [`build-day-${dayName}-a`]: {
      executor: '@nrwl/webpack:webpack',
      outputs: ['{options.outputPath}'],
      options: {
        target: 'node',
        compiler: 'tsc',
        outputPath: 'dist',
        main: `src/day-${dayName}/a.ts`,
        tsConfig: 'tsconfig.app.json',
        outputFileName: 'day-${dayName}-a',
      },
    },
  };
  const buildBTarget = {
    [`build-day-${dayName}-b`]: {
      executor: '@nrwl/webpack:webpack',
      outputs: ['{options.outputPath}'],
      options: {
        target: 'node',
        compiler: 'tsc',
        outputPath: 'dist',
        main: `src/day-${dayName}/b.ts`,
        tsConfig: 'tsconfig.app.json',
        outputFileName: 'day-${dayName}-b',
      },
    },
  };
  const runATarget = {
    executor: '@advent-of-code-starter/nx-advent-of-code-plugin:puzzle',
    inputs: [
      `{workspaceRoot}/data/day-${dayName}/a.txt`,
      `{workspaceRoot}/data/day-${dayName}/a-test.txt`,
      `{workspaceRoot}/src/day-${dayName}/a.ts`,
    ],
    options: {
      targetDay: dayName,
      targetPuzzle: 'a',
      watch: false,
    },
  };
  const runBTarget = {
    executor: '@advent-of-code-starter/nx-advent-of-code-plugin:puzzle',
    inputs: [
      `{workspaceRoot}/data/day-${dayName}/b.txt`,
      `{workspaceRoot}/data/day-${dayName}/b-test.txt`,
      `{workspaceRoot}/src/day-${dayName}/b.ts`,
    ],
    options: {
      targetDay: dayName,
      targetPuzzle: 'b',
      watch: false,
    },
  };
  updateProjectConfiguration(tree, 'advent-of-code-starter', {
    ...projectConfig,
    ...buildATarget,
    ...buildBTarget,
    ...runATarget,
    ...runBTarget,
  });
}

function addCacheableOperations(tree: Tree, dayName: string) {
  const targetNames = [
    `build-day-${dayName}-a`,
    `build-day-${dayName}-b`,
    `day-${dayName}-a`,
    `day-${dayName}-b`,
  ];
  const nxConfig = readNxJson(tree);
  for (const targetName of targetNames) {
    nxConfig.tasksRunnerOptions.default.options.cacheableOperations.push(
      targetName
    );
  }
}

function addFiles(tree: Tree, options: DayGeneratorGeneratorSchema) {
  const templateOptions = {
    ...options,
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'files'), './', templateOptions);
}
