import { expect, describe, test } from '@jest/globals';
import genDiff from '../src/diff.js';
import { solutionNestedJSON, solutionNested, solutionPlain } from '../__fixtures__/solutions.js';

const file1JSON = '__fixtures__/file1.json';
const file2JSON = '__fixtures__/file2.json';
const file1YML = '__fixtures__/file1.yml';
const file2YML = '__fixtures__/file2.yml';

const cases = [[file1JSON, file2JSON, 'stylish', solutionNested], [file1YML, file2YML, 'stylish', solutionNested],
  [file1JSON, file2JSON, 'plain', solutionPlain], [file1YML, file2YML, 'plain', solutionPlain],
  [file1JSON, file2JSON, 'json', solutionNestedJSON], [file1YML, file2YML, 'json', solutionNestedJSON]];

describe("'genDiff' utility", () => {
  test.each(cases)(
    'compared %p and %p to format %p',
    (firstArg, secondArg, format, solution) => {
      const result = genDiff(firstArg, secondArg, format);
      expect(result).toBe(solution);
    },
  );
});
