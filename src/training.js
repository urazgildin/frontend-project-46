import _ from 'lodash';
import { getAbsolutePath, getParsedData } from './utils.js';

const getDifferencies = (filepath1, filepath2) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);
  const obj1 = getParsedData(absolutePath1);
  const obj2 = getParsedData(absolutePath2);
  const obj1Keys = Object.keys(obj1);
  const sortedObj1Keys = _.sortBy(obj1Keys);
  const obj2Keys = Object.keys(obj2);
  const sortedObj2Keys = _.sortBy(obj2Keys);

  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const sortedKeys = _.sortBy(keys);
  const uniqKeys = _.uniq(sortedKeys);
  console.log(uniqKeys);
  const dublicats = sortedKeys.filter((key, index) => sortedKeys.indexOf(key) !== index);
  console.log(dublicats);
  
  const resultArr = uniqKeys.reduce((acc, key) => {
    if (dublicats.includes(key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`  ${key}: ${obj1[key]}`);
      } else {
        acc.push(`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`);
      }
    }

    if (!dublicats.includes(key)) {
      if (Object.hasOwn(obj1, key)) {
        acc.push(`- ${key}: ${obj1[key]}`);
      } else {
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    }
    return acc;
  }, []);

    const resultString = resultArr.join('\n  ');
    console.log(`{\n  ${resultString}\n}`);
};
  
getDifferencies('../__fixtures__/file1.json', '../__fixtures__/file2.json');