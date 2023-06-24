import { cwd } from 'node:process';
import path from 'path';
import fs from 'fs';
import compareObjects from './compare.js';
import getObjectFromPath from './parser.js';
import format from './formatters/index.js';

const getFullPath = (filePath) => {
  const currentDirectory = cwd();
  const fullPath = path.resolve(currentDirectory, filePath);
  return fullPath;
};

const getFileFromPath = (fullPath) => {
  const fileFromPuth = fs.readFileSync(fullPath);
  const fileExtension = path.extname(fullPath).slice(1);
  return getObjectFromPath(fileFromPuth, fileExtension);
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);
  const fileObject1 = getFileFromPath(fullPath1);
  const fileObject2 = getFileFromPath(fullPath2);

  const comparedObjects = compareObjects(fileObject1, fileObject2);

  return format(formatName, comparedObjects);
};

export default genDiff;
