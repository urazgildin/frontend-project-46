import _ from 'lodash';

const getCurrentIndent = (depth, leftMargin = 0, startedDepth = 0, spacesNumber = 4) => ' '.repeat(spacesNumber * (startedDepth + depth) - leftMargin);
const getBracketIndent = (depth, startedDepth = 0, spacesNumber = 4) => ' '.repeat(spacesNumber * (startedDepth + depth) - spacesNumber);

const stringify = (value, startedDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const currentIndent = getCurrentIndent(depth, 0, startedDepth);
    const bracketIndent = getBracketIndent(depth, startedDepth);
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
    const bracketIndent = getBracketIndent(depth);
    const mappedColl = diff.map(({
      type, key, children, value, value1, value2,
    }) => {
      switch (type) {
        case 'added':
          return `${getCurrentIndent(depth, 2)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getCurrentIndent(depth, 2)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getCurrentIndent(depth)}${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getCurrentIndent(depth, 2)}- ${key}: ${stringify(value1, depth)}\n${getCurrentIndent(depth, 2)}+ ${key}: ${stringify(value2, depth)}`;
        default:
          return `${getCurrentIndent(depth)}${key}: ${iter(children, depth + 1)}`;
      }
    });
    const stylishedDiff = mappedColl.join('\n');
    return `{\n${stylishedDiff}\n${bracketIndent}}`;
  };
  return iter(difference, 1);
};

export default stylish;
