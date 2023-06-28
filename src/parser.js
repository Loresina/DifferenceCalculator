import yaml from 'js-yaml';

const getObjectFromPath = (fileFromPath, fileExtension) => {
  if (fileExtension === 'json') {
    return JSON.parse(fileFromPath);
  } if (fileExtension === 'yml' || fileExtension === 'yaml') {
    return yaml.load(fileFromPath);
  }
  throw new Error('Unknown format. Use only "yml" or "json"');
};

export default getObjectFromPath;
