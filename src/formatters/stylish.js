import _ from 'lodash';

const getCurrentIndent = (depth, leftMargin = 2, spacesNumber = 4) => ' '.repeat(spacesNumber * depth - leftMargin);
const getBracketIndent = (depth, spacesNumber = 4) => ' '.repeat(spacesNumber * depth - spacesNumber);

const stringify = (value, startedDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const currentIndent = getCurrentIndent(depth + 1, 0);
    const bracketIndent = getBracketIndent(depth + 1);
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
  return iter(value, startedDepth);
};

const stylish = (difference) => {
  const iter = (diff, depth) => {
    const bracketIndent = getBracketIndent(depth);
    const mappedColl = diff.map(({
      type, key, children, value, value1, value2,
    }) => {
      switch (type) {
        case 'added':
          return `${getCurrentIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getCurrentIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getCurrentIndent(depth, 0)}${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getCurrentIndent(depth)}- ${key}: ${stringify(value1, depth)}\n${getCurrentIndent(depth)}+ ${key}: ${stringify(value2, depth)}`;
        case 'nested':
          return `${getCurrentIndent(depth, 0)}${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    const stylishedDiff = mappedColl.join('\n');
    return `{\n${stylishedDiff}\n${bracketIndent}}`;
  };
  return iter(difference, 1);
};

export default stylish;
