import _ from 'lodash';

const checkValue = (theValue) => {
  if (_.isObject(theValue)) {
    return '[complex value]';
  }
  if (typeof theValue === 'string') {
    return `'${theValue}'`;
  }
  return `${theValue}`;
};

const plain = (sortedArray) => {
  const iter = (iterArray, keysList) => {
    const plainArray = iterArray.flatMap((dict) => {
      switch (dict.status) {
        case 'deleted':
          return `Property '${[...keysList, dict.key].join('.')}' was removed`;
        case 'added':
          return `Property '${[...keysList, dict.key].join('.')}' was added with value: ${(checkValue(dict.value))}`;
        case 'changed':
          return `Property '${[...keysList, dict.key].join('.')}' was updated. From ${checkValue(dict.value1)} to ${checkValue(dict.value2)}`;
        case 'nested':
          return `${iter(dict.value, [...keysList, dict.key])}`;
        default:
          return [];
      }
    });
    return `${plainArray.join('\n')}`;
  };
  return iter(sortedArray, []);
};

export default plain;
