// import __dirname from 'path';
import { expect, test } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import yaml from 'js-yaml';
import { genDiff } from '../src/diff.js';

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

const solutionNested = getFileFromPath('/../__fixtures__/solutionNested');
const solutionPlain = getFileFromPath('/../__fixtures__/solutionPlain');
const solutionNestedJSON = getFileFromPath('/../__fixtures__/solutionNestedJSON.txt');

test('nestedFilesJSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(solutionNested);
});

test('nestedFilesYml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(solutionNested);
});

test('plainFilesJSON', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toBe(solutionPlain);
});

test('plainFilesYml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toBe(solutionPlain);
});

test('jsonFilesJSON', () => {
  console.log(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json'));
  console.log(solutionNestedJSON);
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toBe(solutionNestedJSON);
});

test('jsonFilesYML', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(solutionNestedJSON);
});
