import _ from 'lodash';
import { getAbsolutePath, getParsedData } from '../src/utils.js';

const getDifferencies = (filepath1, filepath2) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);
  const obj1 = getParsedData(absolutePath1);
  const obj2 = getParsedData(absolutePath2);
  const obj1Keys = Object.keys(obj1);
  const sortedObj1Keys = _.sortBy(obj1Keys);
  const obj2Keys = Object.keys(obj2);
  const sortedObj2Keys = _.sortBy(obj2Keys);

  const arrOfDiffs = sortedObj1Keys.reduce((acc, key) => {
    if (Object.hasOwn(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`  ${key}: ${obj1[key]}`);
      } else {
        acc.push(`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`);
      }
    } else {
      acc.push(`- ${key}: ${obj1[key]}`);
    }
    return acc;
  }, []);

  const extendedArrOfDiffs = sortedObj2Keys.reduce((acc, key) => {
    if (!sortedObj1Keys.includes(key)) {
      arrOfDiffs.push(`+ ${key}: ${obj2[key]}`);
    }
    return acc;
  }, arrOfDiffs);

  const result = extendedArrOfDiffs.join('\n');
  console.log(`{\n${result}\n}`);
};

export default getDifferencies;
