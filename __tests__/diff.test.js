// import __dirname from 'path';
import { expect, describe, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'js-yaml';
import genDiff from '../src/diff.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFileFromPath = (filePath) => {
  const fileFromPath = fs.readFileSync(`${dirname}${filePath}`);
  if (path.extname(filePath) === '.json') {
    const fileToObject = JSON.parse(fileFromPath);
    return fileToObject;
  } if (path.extname(filePath) === '.yml' || path.extname(filePath) === '.yaml') {
    const fileToObject = yaml.load(fileFromPath);
    return fileToObject;
  }
  return String(fileFromPath);
};

const file1JSON = '__fixtures__/file1.json';
const file2JSON = '__fixtures__/file2.json';
const file1YML = '__fixtures__/file1.yml';
const file2YML = '__fixtures__/file2.yml';

const solutionNested = getFileFromPath('/../__fixtures__/solutionNested');
const solutionPlain = getFileFromPath('/../__fixtures__/solutionPlain');
const solutionNestedJSON = getFileFromPath('/../__fixtures__/solutionNestedJSON.txt');

const cases = [[file1JSON, file2JSON, solutionNested, 'stylish'], [file1YML, file2YML, solutionNested, 'stylish'],
  [file1JSON, file2JSON, solutionPlain, 'plain'], [file1YML, file2YML, solutionPlain, 'plain'],
  [file1JSON, file2JSON, solutionNestedJSON, 'json'], [file1YML, file2YML, solutionNestedJSON, 'json']];

describe("'genDiff' utility", () => {
  test.each(cases)(
    'description',
    (firstArg, secondArg, solution, format) => {
      const result = genDiff(firstArg, secondArg, format);
      expect(result).toBe(solution);
    },
  );
});
