import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';
import getData from './parsers.js';
import chooseFormater from './formatters/index.js';

const isAbsolute = (path) => path.startsWith('/');

const getAbsolutePath = (path) => {
  if (!isAbsolute(path)) {
    return resolve(cwd(), path);
  }
  return path;
};

const getDifferencies = (filepath1, filepath2, formater = 'stylish') => {
  const data1 = readFileSync(getAbsolutePath(filepath1), 'utf8');
  const data2 = readFileSync(getAbsolutePath(filepath2), 'utf8');
  const obj1 = getData(data1, extname(filepath1));
  const obj2 = getData(data2, extname(filepath2));
  const iter = (ob1, ob2) => {
    const uniqKeys = _.union(Object.keys(ob1), Object.keys(ob2));
    const sortedUniqKeys = _.sortBy(uniqKeys);
    const collOfDifferences = sortedUniqKeys.reduce((acc, uniqKey) => {
      if (!Object.hasOwn(ob1, uniqKey)) {
        acc.push({ key: uniqKey, value: ob2[uniqKey], type: 'added' });
      } else if (!Object.hasOwn(ob2, uniqKey)) {
        acc.push({ key: uniqKey, value: ob1[uniqKey], type: 'deleted' });
      } else if (Object.hasOwn(ob1, uniqKey) && Object.hasOwn(ob2, uniqKey)
      && _.isEqual(ob1[uniqKey], ob2[uniqKey])) {
        acc.push({ key: uniqKey, value: ob2[uniqKey], type: 'unchanged' });
      } else if (Object.hasOwn(ob1, uniqKey) && Object.hasOwn(ob2, uniqKey)
      && !_.isEqual(ob1[uniqKey], ob2[uniqKey])
      && (!_.isObject(ob1[uniqKey]) || !_.isObject(ob2[uniqKey]))) {
        acc.push({
          key: uniqKey, value1: ob1[uniqKey], value2: ob2[uniqKey], type: 'changed',
        });
      } else {
        acc.push({ key: uniqKey, value: iter(ob1[uniqKey], ob2[uniqKey]), type: 'nested' });
      }
      return acc;
    }, []);
    return collOfDifferences;
  };
  const diff = iter(obj1, obj2);
  return chooseFormater(diff, formater);
};

export default getDifferencies;
