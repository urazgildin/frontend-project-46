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
  const iter = (ob1, ob2) => {
    const uniqKeys = _.union(Object.keys(ob1), Object.keys(ob2));
    const sortedKeys = _.sortBy(uniqKeys);
    const resultAsArr = sortedKeys.reduce((acc, key) => {
      if (!Object.hasOwn(ob1, key)) {
        acc.push({ key: key, value: ob2[key], type: 'added' });
      }
      if (!Object.hasOwn(ob2, key)) {
        acc.push({ key: key, value: ob1[key], type: 'deleted' });
      }
      if (Object.hasOwn(ob1, key) && Object.hasOwn(ob2, key)) {
        if (_.isEqual(ob1[key], ob2[key])) {
          acc.push({ key: key, value: ob2[key], type: '' });
        } else if (!_.isEqual(ob1[key], ob2[key]) && !_.isObject(ob1[key]) && !_.isObject(ob2[key])) {
          acc.push({ key: key, value: ob1[key], type: 'deleted' }, { key: key, value: ob2[key], type: 'added' });
        } else if (_.isObject(ob1[key]) && !_.isObject(ob2[key])) {
          acc.push({ key: key, value: ob1[key], type: 'deleted' }, { key: key, value: ob2[key], type: 'added' });
        } else if (!_.isObject(ob1[key]) && _.isObject(ob2[key])) {
          acc.push({ key: key, value: ob1[key], type: 'deleted' }, { key: key, value: ob2[key], type: 'added' });
        } else {
          acc.push({ key: key, value: iter(ob1[key], ob2[key]), type: 'nested' });
        }
      }
      return acc;
    }, []);
    return resultAsArr;
  };
  return iter(obj1, obj2);
};
export default getDifferencies;
