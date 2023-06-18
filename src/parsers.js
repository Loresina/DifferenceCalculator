import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const getObjectFromPath = (fullPath) => {
  const fileFromPuth = fs.readFileSync(fullPath);
  let result = {};
  if (path.extname(fullPath) === '.json') {
    const fileToObject = JSON.parse(fileFromPuth);
    result = fileToObject;
  } if (path.extname(fullPath) === '.yml' || path.extname(fullPath) === '.yaml') {
    const fileToObject = yaml.load(fileFromPuth);
    result = fileToObject;
  }
  return result;
};

export default getObjectFromPath;
