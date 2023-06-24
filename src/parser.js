import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const getFileFromPath = (fullPath) => {
  const fileFromPuth = fs.readFileSync(fullPath);
  const fileExtension = path.extname(fullPath).slice(1);
  return [fileFromPuth, fileExtension];
};

const getObjectFromPath = (fullPath) => {
  const [fileFromPuth, fileExtension] = getFileFromPath(fullPath);
  if (fileExtension === 'json') {
    return JSON.parse(fileFromPuth);
  } if (fileExtension === 'yml' || fileExtension === 'yaml') {
    return yaml.load(fileFromPuth);
  }
  throw new Error('Unknown format. Use only "stylish" or "plain"');
};

export default getObjectFromPath;
