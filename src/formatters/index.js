import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJson from './json.js';

const formaters = {
  plain: toPlain,
  stylish: toStylish,
  json: toJson,
};

const format = (formatName, comparedObjects) => {
  const result = formaters[formatName](comparedObjects);
  if (result) {
    return result;
  }
  throw new Error('Unknown format. Use only "stylish", "plain" or "json"');
};

export default format;
