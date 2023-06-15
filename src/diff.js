import fs from 'fs';
import _ from 'lodash';

const compareFiles = (file1, file2) => {
  const result = {};
  const fileObject1 = JSON.parse(file1);
  const fileObject2 = JSON.parse(file2);
  const keys1 = _.sortBy(Object.keys(fileObject1));
  const keys2 = _.sortBy(Object.keys(fileObject2));
  const keys = [...keys1, ...keys2];

  for (const key of keys) {
    if (!Object.hasOwn(fileObject1, key)) {
      const keyAdd = `+ ${key}`;
      result[keyAdd] = fileObject2[key];
    } else if (!Object.hasOwn(fileObject2, key)) {
      const keyAdd = `- ${key}`;
      result[keyAdd] = fileObject1[key];
    } else if (fileObject1[key] === fileObject2[key]) {
      const keyAdd = `  ${key}`;
      result[keyAdd] = fileObject2[key];
    } else {
      const keyAdd1 = `- ${key}`;
      const keyAdd2 = `+ ${key}`;
      result[keyAdd1] = fileObject1[key];
      result[keyAdd2] = fileObject2[key];
    }
  }
  return JSON.stringify(result, null, ' ');
};

const genDiff = (filePath1, filePath2) => {
  const file1 = fs.readFileSync(filePath1);
  const file2 = fs.readFileSync(filePath2);

  console.log('Hello');
  console.log(compareFiles(file1, file2));
};

// for example
// const path1 = 'examples/file1.json';
// const path2 = 'examples/file2.json';

// genDiff(path1, path2);

export default genDiff;
