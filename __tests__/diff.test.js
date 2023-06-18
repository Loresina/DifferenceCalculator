// import __dirname from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { compareFiles } from '../src/diff.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const getFileToPuth = (puth) => {
  const fileToPuth = fs.readFileSync(`${dirname}${puth}`);
  const fileToObject = JSON.parse(fileToPuth);

  return fileToObject;
};

const file1 = getFileToPuth('/../__fixtures__/file1.json');
const file2 = getFileToPuth('/../__fixtures__/file2.json');
const solution = getFileToPuth('/../__fixtures__/solution.json');

test('compareFiles', () => {
  const solutionJson = JSON.stringify(solution, null, ' ');
  expect(compareFiles(file1, file2)).toEqual(solutionJson);
});
