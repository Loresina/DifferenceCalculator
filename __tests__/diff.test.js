// import __dirname from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'js-yaml';
import { compareObjects } from '../src/diff.js';

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

const file1JSON = getFileFromPath('/../__fixtures__/file1.json');
const file2JSON = getFileFromPath('/../__fixtures__/file2.json');
const file1Yml = getFileFromPath('/../__fixtures__/file1.yml');
const file2Yml = getFileFromPath('/../__fixtures__/file2.yml');
const solution = getFileFromPath('/../__fixtures__/solution');

test('compareFilesJSON', () => {
  expect(compareObjects(file1JSON, file2JSON)).toBe(solution);
});

test('compareFilesYml', () => {
  expect(compareObjects(file1Yml, file2Yml)).toBe(solution);
});
