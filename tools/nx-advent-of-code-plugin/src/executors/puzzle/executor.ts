import { DayExecutorSchema } from './schema';
import nxNodeExecutor from '@nrwl/js/src/executors/node/node.impl';

export default function runExecutor(options: DayExecutorSchema, context) {
  const dataFile = `data/day-${options.targetDay}/${options.targetPuzzle}${
    options.testData ? '-test' : ''
  }.txt`;
  const buildTarget = `advent-of-code-starter:build-day-${options.targetDay}-${options.targetPuzzle}`;
  return nxNodeExecutor(
    {
      ...options,
      buildTarget,
      args: [dataFile, ...options.args, '--run'],
    },
    context
  );
}
