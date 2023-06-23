import _ from 'lodash';

const stylishNested = (dict, mainIndent) => {
  const iter = (value, depth) => {
    if (!_.isObject(value) || value === null) {
      return String(value);
    }

    const indent = depth + 3;
    const backIndent = depth - 1;

    const nestedLines = Object.entries(value).map(([key, val]) => `${' '.repeat(indent)}${key}: ${iter(val, depth + 4)}`);

    return `{\n${[...nestedLines].join('\n')}\n${' '.repeat(backIndent)}}`;
  };
  return iter(dict, mainIndent);
};

const stylish = (sortedArray) => {
  const iter = (iterArray, depth) => {
    const stylishArray = iterArray.map((dict) => {
      switch (dict.status) {
        case 'deleted':
          return `${' '.repeat(1 + depth)}- ${dict.key}: ${stylishNested(dict.value, depth + 4)}`;
        case 'added':
          return `${' '.repeat(1 + depth)}+ ${dict.key}: ${stylishNested(dict.value, depth + 4)}`;
        case 'changed':
          return `${' '.repeat(1 + depth)}- ${dict.key}: ${stylishNested(dict.value1, depth + 4)}\n${' '.repeat(1 + depth)}+ ${dict.key}: ${stylishNested(dict.value2, depth + 4)}`;
        case 'unchanged':
          return `${' '.repeat(1 + depth)}  ${dict.key}: ${stylishNested(dict.value, depth + 4)}`;
        default:
          return `${' '.repeat(1 + depth)}  ${dict.key}: ${iter((dict.value), depth + 4)}`;
      }
    });
    const stringStylishArray = `{\n${stylishArray.join('\n')}\n${' '.repeat(depth - 1)}}`;
    return stringStylishArray;
  };
  return iter(sortedArray, 1);
};

export default stylish;
