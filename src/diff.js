import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

const compareFiles = (fileObject1, fileObject2) => {
  const result = {};
  const keys1 = _.sortBy(Object.keys(fileObject1));
  const keys2 = _.sortBy(Object.keys(fileObject2));
  const keys = [...keys1, ...keys2];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!Object.hasOwn(fileObject1, key)) {
      const keyAdd = `+ ${key}`;
      result[keyAdd] = fileObject2[key];
    } else if (!Object.hasOwn(fileObject2, key)) {
      const keyAdd = `- ${key}`;
      result[keyAdd] = fileObject1[key];
    } else if (fileObject1[key] === fileObject2[key]) {
      const keyAdd = `  ${key}`;
      result[keyAdd] = fileObject2[key];
    } else {
      const keyAdd1 = `- ${key}`;
      const keyAdd2 = `+ ${key}`;
      result[keyAdd1] = fileObject1[key];
      result[keyAdd2] = fileObject2[key];
    }
  }
  return JSON.stringify(result, null, ' ');
};

const getFileToPuth = (puth) => {
  const currentDirectory = cwd();
  const fileToPuth = fs.readFileSync(path.resolve(currentDirectory, puth));
  const fileToObject = JSON.parse(fileToPuth);
  return fileToObject;
};

const genDiff = (filePath1, filePath2) => {
  const fileObject1 = getFileToPuth(filePath1);
  const fileObject2 = getFileToPuth(filePath2);

  console.log(compareFiles(fileObject1, fileObject2));
};

const example = (string) => string;

// console.log(example('hello'));

// for example
// const path1 = 'examples/file1.json';
// const path2 = 'examples/file2.json';

// genDiff(path1, path2);

// const currentDirectory = cwd();
// console.log(currentDirectory);
// console.log(path.resolve(currentDirectory, path1));

export { genDiff, compareFiles, example };
