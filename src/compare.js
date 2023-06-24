import _ from 'lodash';

const compareObjects = (fileObject1, fileObject2) => {
  const keys1 = Object.keys(fileObject1);
  const keys2 = Object.keys(fileObject2);
  const keys = _.uniq(_.sortBy([...keys1, ...keys2]));

  const comparedArray = keys.map((key) => {
    const theValue1 = fileObject1[key];
    const theValue2 = fileObject2[key];
    if (Object.hasOwn(fileObject1, key) && Object.hasOwn(fileObject2, key)
    && _.isObject(theValue1) && _.isObject(theValue2)) {
      return { status: 'nested', key, value: compareObjects(theValue1, theValue2) };
    } if (!Object.hasOwn(fileObject1, key)) {
      const theValue = fileObject2[key];
      return { status: 'added', key, value: theValue };
    } if (!Object.hasOwn(fileObject2, key)) {
      const theValue = fileObject1[key];
      return { status: 'deleted', key, value: theValue };
    } if (fileObject1[key] === fileObject2[key]) {
      const theValue = fileObject2[key];
      return { status: 'unchanged', key, value: theValue };
    }
    return {
      status: 'changed', key, value1: theValue1, value2: theValue2,
    };
  });
  return comparedArray;
};

export default compareObjects;
