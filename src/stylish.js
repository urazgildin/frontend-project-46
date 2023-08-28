import _ from 'lodash';
import getDifferencies from './recursiveGendiff.js';

const goDeepUnchanged = (tree, externalDepth) => {
  const iter = (obj, depth) => {
    const gap1 = ' '.repeat(externalDepth * 4 + 4 * depth);
    const gap2 = ' '.repeat(externalDepth * 4 + (4 * depth - 4));
    const arrKeyValue = Object.entries(obj);
    const changedArrKeyValue = arrKeyValue.map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${gap1}${key}: ${value}`;
      }
      return `${gap1}${key}: ${iter(value, depth + 1)}`;
    });
    const resultAsString = changedArrKeyValue.join('\n');
    return `{\n${resultAsString}\n${gap2}}`;
  };
  return iter(tree, 1);
};

const stylish = (diff) => {
  const iter = (res, depth) => {
    const gap = (back) => ' '.repeat(4 * depth - back);
    const gap2 = ' '.repeat(4 * depth - 4);
    const redactedArr = res.map(({ key, value, type }) => {
      if (type !== 'nested') {
        if (type === 'added' && !_.isObject(value)) {
          return `${gap(2)}+ ${key}: ${value}`;
        }
        if (type === 'deleted' && !_.isObject(value)) {
          return `${gap(2)}- ${key}: ${value}`;
        }
        if (type === '' && !_.isObject(value)) {
          return `${gap(0)}${key}: ${value}`;
        }
        if (type === 'added' && _.isObject(value)) {
          return `${gap(2)}+ ${key}: ${goDeepUnchanged(value, depth)}`;
        }
        if (type === 'deleted' && _.isObject(value)) {
          return `${gap(2)}- ${key}: ${goDeepUnchanged(value, depth)}`;
        }
      }
      return `${gap(0)}${key}: ${iter(value, depth + 1)}`;
    });
    const resultAsString = redactedArr.join('\n');
    return `{\n${resultAsString}\n${gap2}}`;
  };
  return iter(diff, 1);
};

export default stylish;
