import { NodeExecutorOptions } from '@nrwl/js/src/executors/node/schema';

export interface DayExecutorSchema
  extends Omit<NodeExecutorOptions, 'buildTarget'> {
  targetDay: string;
  targetPuzzle: 'a' | 'b';
  testData: boolean;
} // eslint-disable-line
