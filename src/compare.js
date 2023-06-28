import _ from 'lodash';

const compareObjects = (fileObject1, fileObject2) => {
  const keys1 = Object.keys(fileObject1);
  const keys2 = Object.keys(fileObject2);
  const keys = _.uniq(_.sortBy([...keys1, ...keys2]));

  const comparedArray = keys.map((key) => {
    const valueFile1 = fileObject1[key];
    const valueFile2 = fileObject2[key];
    if (_.isObject(valueFile1) && _.isObject(valueFile2)) {
      return { status: 'nested', key, value: compareObjects(valueFile1, valueFile2) };
    }
    if (!Object.hasOwn(fileObject1, key)) {
      return { status: 'added', key, value: valueFile2 };
    }
    if (!Object.hasOwn(fileObject2, key)) {
      return { status: 'deleted', key, value: valueFile1 };
    }
    if (valueFile1 === valueFile2) {
      return { status: 'unchanged', key, value: valueFile1 };
    }
    return {
      status: 'changed', key, value1: valueFile1, value2: valueFile2,
    };
  });
  return comparedArray;
};

export default compareObjects;
