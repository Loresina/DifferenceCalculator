import _ from 'lodash';

const stylishNested = (dict, mainIndent) => {
  const iter = (value, depth) => {
    if (!_.isObject(value)) {
      return String(value);
    }

    const startIndent = ' '.repeat(depth + 3);
    const backIndent = depth - 1;

    const nestedLines = Object.entries(value).map(([key, val]) => `${startIndent}${key}: ${iter(val, depth + 4)}`);

    return `{\n${[...nestedLines].join('\n')}\n${' '.repeat(backIndent)}}`;
  };
  return iter(dict, mainIndent);
};

const toStylish = (sortedArray) => {
  const iter = (iterArray, depth) => {
    const stylishArray = iterArray.map((dict) => {
      const startIndent = ' '.repeat(1 + depth);
      const nextIndent = depth + 4;

      switch (dict.status) {
        case 'deleted':
          return `${startIndent}- ${dict.key}: ${stylishNested(dict.value, nextIndent)}`;
        case 'added':
          return `${startIndent}+ ${dict.key}: ${stylishNested(dict.value, nextIndent)}`;
        case 'changed':
          return `${startIndent}- ${dict.key}: ${stylishNested(dict.value1, nextIndent)}\n${startIndent}+ ${dict.key}: ${stylishNested(dict.value2, nextIndent)}`;
        case 'unchanged':
          return `${startIndent}  ${dict.key}: ${stylishNested(dict.value, nextIndent)}`;
        default:
          return `${startIndent}  ${dict.key}: ${iter((dict.value), nextIndent)}`;
      }
    });
    const stringStylishArray = `{\n${stylishArray.join('\n')}\n${' '.repeat(depth - 1)}}`;
    return stringStylishArray;
  };
  return iter(sortedArray, 1);
};

export default toStylish;
