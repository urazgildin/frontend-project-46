import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import _ from 'lodash';
import parseData from './parsers.js';
import chooseFormater from './formatters/index.js';

const getFullPath = (path) => resolve(cwd(), path);

const getFormat = (path) => extname(path).slice(1);

const convertToObject = (path) => {
  const data = readFileSync(getFullPath(path), 'utf8');
  return parseData(data, getFormat(path));
};

const buildTree = (ob1, ob2) => {
  const uniqKeys = _.union(Object.keys(ob1), Object.keys(ob2));
  const sortedUniqKeys = _.sortBy(uniqKeys);
  const collOfDifferences = sortedUniqKeys.map((uniqKey) => {
    if (!Object.hasOwn(ob1, uniqKey)) {
      return { key: uniqKey, value: ob2[uniqKey], type: 'added' };
    }
    if (!Object.hasOwn(ob2, uniqKey)) {
      return { key: uniqKey, value: ob1[uniqKey], type: 'deleted' };
    }
    if (_.isPlainObject(ob1[uniqKey]) && _.isPlainObject(ob2[uniqKey])) {
      return { key: uniqKey, children: buildTree(ob1[uniqKey], ob2[uniqKey]), type: 'nested' };
    }
    if (!_.isEqual(ob1[uniqKey], ob2[uniqKey])) {
      return {
        key: uniqKey, value1: ob1[uniqKey], value2: ob2[uniqKey], type: 'changed',
      };
    }
    return { key: uniqKey, value: ob2[uniqKey], type: 'unchanged' };
  });
  return collOfDifferences;
};

const getDifferencies = (filepath1, filepath2, formater = 'stylish') => {
  const obj1 = convertToObject(filepath1);
  const obj2 = convertToObject(filepath2);

  const diff = buildTree(obj1, obj2);
  return chooseFormater(diff, formater);
};

export default getDifferencies;
