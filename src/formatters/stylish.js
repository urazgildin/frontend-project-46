import _ from 'lodash';
import {
  getType, getKey, getValue, getValue1, getValue2,
} from '../selectors.js';

const getCurrentIndent = (spacesNumber, depth, leftMargin = 0, startedDepth = 0) => ' '.repeat(spacesNumber * (startedDepth + depth) - leftMargin);

const getBracketIndent = (spacesNumber, depth, startedDepth = 0) => ' '.repeat(spacesNumber * (startedDepth + depth) - spacesNumber);

const stringify = (value, startedDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const currentIndent = getCurrentIndent(4, depth, 0, startedDepth);
    const bracketIndent = getBracketIndent(4, depth, startedDepth);
    const collOfKeysValues = Object.entries(currentValue);
    const mappedColl = collOfKeysValues.map(([key, val]) => {
      if (!_.isObject(val)) {
        return `${currentIndent}${key}: ${val}`;
      }
      return `${currentIndent}${key}: ${iter(val, depth + 1)}`;
    });
    const stringifiedColl = mappedColl.join('\n');
    return `{\n${stringifiedColl}\n${bracketIndent}}`;
  };
  return iter(value, 1);
};

const stylish = (difference) => {
  const iter = (diff, depth) => {
    const bracketIndent = getBracketIndent(4, depth);
    const mappedColl = diff.map((item) => {
      const type = getType(item);
      const key = getKey(item);
      const value = getValue(item);
      const value1 = getValue1(item);
      const value2 = getValue2(item);

      if (type !== 'nested') {
        if (type === 'added') {
          return `${getCurrentIndent(4, depth, 2)}+ ${key}: ${stringify(value, depth)}`;
        }
        if (type === 'deleted') {
          return `${getCurrentIndent(4, depth, 2)}- ${key}: ${stringify(value, depth)}`;
        }
        if (type === 'unchanged') {
          return `${getCurrentIndent(4, depth)}${key}: ${stringify(value, depth)}`;
        }
        if (type === 'changed' && !_.isObject(value)) {
          return `${getCurrentIndent(4, depth, 2)}- ${key}: ${stringify(value1, depth)}\n${getCurrentIndent(4, depth, 2)}+ ${key}: ${stringify(value2, depth)}`;
        }
      }
      return `${getCurrentIndent(4, depth)}${key}: ${iter(value, depth + 1)}`;
    });
    const stylishedDiff = mappedColl.join('\n');
    return `{\n${stylishedDiff}\n${bracketIndent}}`;
  };
  return iter(difference, 1);
};

export default stylish;
