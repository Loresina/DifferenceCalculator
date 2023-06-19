import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';
import getObjectFromPath from './parsers.js';

const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (object, result, depth) => {
    const typeOfValue = typeof (object);
    if (typeOfValue !== 'object' || object === null) {
      return String(object);
    }

    if (typeOfValue === 'object') {
      const keys = Object.keys(object);
      const bestedObjects = keys.map((key) => {
        const stringifyKey = `${replacer.repeat(spacesCount * depth)}${key}`;
        return `${stringifyKey}: ${iter(object[key], result, depth + 1)}`;
      });
      return `{\n${result}${bestedObjects.join('\n')}\n${replacer.repeat(spacesCount * (depth - 1))}}`;
    }
    return 'hello';
  };
  return iter(value, '', 1);
};

const compareObjects = (fileObject1, fileObject2) => {
  const result = [];
  const keys1 = _.sortBy(Object.keys(fileObject1));
  const keys2 = _.sortBy(Object.keys(fileObject2));
  const keys = [...keys1, ...keys2];

  for (let i = 0; i < keys.length; i += 1) {
    const theKey = keys[i];
    if (!Object.hasOwn(fileObject1, theKey)) {
      const theValue = fileObject2[theKey];
      result.push({ statust: 'added', key: theKey, value: theValue });
    } else if (!Object.hasOwn(fileObject2, theKey)) {
      const theValue = fileObject1[theKey];
      result.push({ statust: 'deleted', key: theKey, value: theValue });
    } else if (fileObject1[theKey] === fileObject2[theKey]) {
      const theValue = fileObject2[theKey];
      result.push({ statust: 'unchanged', key: theKey, value: theValue });
    } else {
      const theValue1 = fileObject1[theKey];
      const theValue2 = fileObject2[theKey];
      result.push({
        statust: 'changed', key: theKey, value1: theValue1, value2: theValue2,
      });
    }
  }
  const uniqueResult = _.uniqBy(result, (obj) => obj.key);
  return console.log(uniqueResult);
};

const getFullPath = (filePath) => {
  const currentDirectory = cwd();
  const fullPath = path.resolve(currentDirectory, filePath);
  return fullPath;
};

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);
  const fileObject1 = getObjectFromPath(fullPath1);
  const fileObject2 = getObjectFromPath(fullPath2);

  console.log(compareObjects(fileObject1, fileObject2));
};

// console.log(example('hello'));

// for example
// const path1 = 'examples/file1.json';
// const path2 = 'examples/file2.json';

// const fullPath = getFullPath(path1);
// console.log(getFileFromPath(fullPath));

// const path1 = 'examples/file1.yml';
// const path2 = 'examples/file2.yml';

// genDiff(path1, path2);

// const currentDirectory = cwd();
// console.log(currentDirectory);
// console.log(path.resolve(currentDirectory, path1));

// const docJbject = yaml.load(fs.readFileSync('__fixtures__/file1.yml'));
// console.log(docJbject);
// const extname = path.extname('__fixtures__/file1.yml');
// console.log(extname);

// const docJbject = fs.readFileSync('__fixtures__/solution');
// console.log(String(docJbject));

export { genDiff, compareObjects };
