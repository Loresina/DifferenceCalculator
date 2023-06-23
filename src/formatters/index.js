import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (formatName, comparedObjects) => {
  if (formatName === 'plain') {
    return plain(comparedObjects);
  }
  if (formatName === 'stylish') {
    return stylish(comparedObjects);
  }
  if (formatName === 'json') {
    return json(comparedObjects);
  }
  throw new Error('Unknown format. Use only "stylish" or "plain"');
};

export default format;
