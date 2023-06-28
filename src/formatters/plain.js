import _ from 'lodash';

const getValue = (theValue) => {
  if (_.isObject(theValue)) {
    return '[complex value]';
  }
  if (typeof theValue === 'string') {
    return `'${theValue}'`;
  }
  return `${theValue}`;
};

const toPlain = (sortedArray) => {
  const iter = (iterArray, keysList) => {
    const plainArray = iterArray.flatMap((dict) => {
      const keyPuth = [...keysList, dict.key].join('.');
      switch (dict.status) {
        case 'deleted':
          return `Property '${keyPuth}' was removed`;
        case 'added':
          return `Property '${keyPuth}' was added with value: ${(getValue(dict.value))}`;
        case 'changed':
          return `Property '${keyPuth}' was updated. From ${getValue(dict.value1)} to ${getValue(dict.value2)}`;
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

export default toPlain;
