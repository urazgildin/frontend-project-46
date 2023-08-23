import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import _ from 'lodash';
import { getAbsolutePath } from './utils.js';
import getParsedData from './parsers.js';

const getDifferencies = (filepath1, filepath2) => {
  const data1 = readFileSync(getAbsolutePath(filepath1), 'utf8');
  const data2 = readFileSync(getAbsolutePath(filepath2), 'utf8');
  const obj1 = getParsedData(data1, extname(filepath1));
  const obj2 = getParsedData(data2, extname(filepath2));

  const uniqKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);

  const resultAsArr = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(obj1, key)) {
      acc.push(`+ ${key}: ${obj2[key]}`);
    }
    if (!Object.hasOwn(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}`);
    }
    if (Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
      if (!_.isEqual(obj1[key], obj2[key])) {
        acc.push(`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`);
      } else {
        acc.push(`  ${key}: ${obj1[key]}`);
      }
    }
    return acc;
  }, []);

  const resultAsString = resultAsArr.join('\n  ');
  console.log(`{\n  ${resultAsString}\n}`);
  return `{\n  ${resultAsString}\n}`;
};

export default getDifferencies;
