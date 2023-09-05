import _ from 'lodash';

const stringify = (value, startedDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const spacesNumber = 4;
    const currentIndent = ' '.repeat(startedDepth * spacesNumber + spacesNumber * depth);
    const bracketIndent = ' '.repeat(startedDepth * spacesNumber + (spacesNumber * depth - spacesNumber));
    const collOfKeysValues = Object.entries(currentValue);
    const mappedColl = collOfKeysValues.map(([key, newValue]) => {
      if (!_.isObject(newValue)) {
        return `${currentIndent}${key}: ${newValue}`;
      }
      return `${currentIndent}${key}: ${iter(newValue, depth + 1)}`;
    });
    const stringifiedColl = mappedColl.join('\n');
    return `{\n${stringifiedColl}\n${bracketIndent}}`;
  };
  return iter(value, 1);
};

const stylish = (difference) => {
  const iter = (diff, depth) => {
    const spacesNumber = 4;
    const currentIndent = (leftMargin) => ' '.repeat(spacesNumber * depth - leftMargin);
    const bracketIndent = ' '.repeat(spacesNumber * depth - spacesNumber);
    const mappedColl = diff.map(({
      key, value, value1, value2, type,
    }) => {
      if (type !== 'nested') {
        if (type === 'added') {
          return `${currentIndent(2)}+ ${key}: ${stringify(value, depth)}`;
        }
        if (type === 'deleted') {
          return `${currentIndent(2)}- ${key}: ${stringify(value, depth)}`;
        }
        if (type === 'unchanged') {
          return `${currentIndent(0)}${key}: ${stringify(value, depth)}`;
        }
        if (type === 'changed' && !_.isObject(value)) {
          return `${currentIndent(2)}- ${key}: ${stringify(value1, depth)}\n${currentIndent(2)}+ ${key}: ${stringify(value2, depth)}`;
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
