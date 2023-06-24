import yaml from 'js-yaml';

const getObjectFromPath = (fileFromPuth, fileExtension) => {
  if (fileExtension === 'json') {
    return JSON.parse(fileFromPuth);
  } if (fileExtension === 'yml' || fileExtension === 'yaml') {
    return yaml.load(fileFromPuth);
  }
  throw new Error('Unknown format. Use only "stylish" or "plain"');
};

export default getObjectFromPath;
