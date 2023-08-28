import _ from 'lodash';
import getDifferencies from './recursiveGendiff.js';

const stringify = (object, startedDepth) => {
  const iter = (obj, depth) => {
    const spacesNumber = 4;
    const currentIndent = ' '.repeat(startedDepth * spacesNumber + spacesNumber * depth);
    const bracketIndent = ' '.repeat(startedDepth * spacesNumber + (spacesNumber * depth - spacesNumber));
    const collOfKeysValues = Object.entries(obj);
    const mappedColl = collOfKeysValues.map(([key, value]) => {
      if (!_.isObject(value)) {
        return `${currentIndent}${key}: ${value}`;
      }
      return `${currentIndent}${key}: ${iter(value, depth + 1)}`;
    });
    const stringifiedColl = mappedColl.join('\n');
    return `{\n${stringifiedColl}\n${bracketIndent}}`;
  };
  return iter(object, 1);
};

const stylish = (difference) => {
  const iter = (diff, depth) => {
    const spacesNumber = 4;
    const currentIndent = (leftMargin) => ' '.repeat(spacesNumber * depth - leftMargin);
    const bracketIndent = ' '.repeat(spacesNumber * depth - spacesNumber);
    const mappedColl = diff.map(({ key, value, type }) => {
      if (type !== 'nested') {
        if (type === 'added' && !_.isObject(value)) {
          return `${currentIndent(2)}+ ${key}: ${value}`;
        }
        if (type === 'deleted' && !_.isObject(value)) {
          return `${currentIndent(2)}- ${key}: ${value}`;
        }
        if (type === 'unchanged' && !_.isObject(value)) {
          return `${currentIndent(0)}${key}: ${value}`;
        }
        if (type === 'added' && _.isObject(value)) {
          return `${currentIndent(2)}+ ${key}: ${stringify(value, depth)}`;
        }
        if (type === 'deleted' && _.isObject(value)) {
          return `${currentIndent(2)}- ${key}: ${stringify(value, depth)}`;
        }
      }
      return `${currentIndent(0)}${key}: ${iter(value, depth + 1)}`;
    });
    const stylishedDiff = mappedColl.join('\n');
    return `{\n${stylishedDiff}\n${bracketIndent}}`;
  };
  return iter(difference, 1);
};

export default stylish;
