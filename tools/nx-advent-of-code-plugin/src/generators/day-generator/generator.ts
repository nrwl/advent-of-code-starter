import {
  formatFiles,
  generateFiles,
  readJson,
  Tree,
  writeJson,
} from '@nrwl/devkit';
import {
  readNxJson,
  readProjectConfiguration,
} from 'nx/src/generators/utils/project-configuration';
import * as path from 'path';
import { DayGeneratorGeneratorSchema } from './schema';

export default async function (
  tree: Tree,
  options: DayGeneratorGeneratorSchema
) {
  addTargets(tree, `${options.dayName}`);
  addCacheableOperations(tree, `${options.dayName}`);
  addFiles(tree, options);
  formatFiles(tree);
}

function addTargets(tree: Tree, dayName: string) {
  const projectConfig = readJson(tree, 'project.json');
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
        outputFileName: `day-${dayName}-a`,
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
        outputFileName: `day-${dayName}-b`,
      },
    },
  };
  const runATarget = {
    [`day-${dayName}-a`]: {
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
    },
  };
  const runBTarget = {
    [`day-${dayName}-b`]: {
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
    },
  };
  const testATarget = {
    [`test-day-${dayName}-a`]: {
      executor: '@nrwl/jest:jest',
      options: {
        jestConfig: 'jest.config.ts',
        passWithNoTests: true,
        codeCoverage: false,
        testPathPattern: [`day-${dayName}/a.spec.ts`],
      },
    },
  };
  const testBTarget = {
    [`test-day-${dayName}-b`]: {
      executor: '@nrwl/jest:jest',
      options: {
        jestConfig: 'jest.config.ts',
        passWithNoTests: true,
        codeCoverage: false,
        testPathPattern: [`day-${dayName}/b.spec.ts`],
      },
    },
  };
  writeJson(tree, 'project.json', {
    ...projectConfig,
    targets: {
      ...projectConfig.targets,
      ...buildATarget,
      ...buildBTarget,
      ...runATarget,
      ...runBTarget,
      ...testATarget,
      ...testBTarget,
    },
  });
}

function addCacheableOperations(tree: Tree, dayName: string) {
  const targetNames = [
    `build-day-${dayName}-a`,
    `build-day-${dayName}-b`,
    `day-${dayName}-a`,
    `day-${dayName}-b`,
    `test-day-${dayName}-a`,
    `test-day-${dayName}-b`,
  ];
  const nxConfig = readNxJson(tree);
  const cacheableOperationsSet = new Set(
    nxConfig.tasksRunnerOptions.default.options.cacheableOperations
  );
  for (const targetName of targetNames) {
    cacheableOperationsSet.add(targetName);
  }
  nxConfig.tasksRunnerOptions.default.options.cacheableOperations = [
    ...cacheableOperationsSet,
  ];
  writeJson(tree, 'nx.json', nxConfig);
}

function addFiles(tree: Tree, options: DayGeneratorGeneratorSchema) {
  const templateOptions = {
    ...options,
    template: '',
  };
  generateFiles(tree, path.join(__dirname, 'files'), './', templateOptions);
}
