import _ from 'lodash';

const builtPath = (currentPath, key) => {
  const newArr = [...currentPath];
  newArr.push(key);
  return newArr.join('.');
};

const convertToCorrectForm = (value) => {
  if (typeof value === 'string' && value !== '[complex value]') {
    return `'${value}'`;
  }
  return value;
};

const textWnenAdded = (key, value) => `Property '${key}' was added with value: ${convertToCorrectForm(value)}`;
const textWnenRemoved = (key) => `Property '${key}' was removed`;
const textWnenUpdated = (key, value1, value2) => `Property '${key}' was updated. From ${convertToCorrectForm(value1)} to ${convertToCorrectForm(value2)}`;

const convertComplexValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (difference) => {
  const iter = (diff, ancestors) => {
    const fiteredDiff = diff.filter(({ type }) => type !== 'unchanged');
    const plainDiff = fiteredDiff.flatMap(({
      key, value, value1, value2, type,
    }) => {
      if (type !== 'nested') {
        if (type === 'added') {
          return textWnenAdded(builtPath(ancestors, key), convertComplexValue(value));
        }
        if (type === 'deleted') {
          return textWnenRemoved(builtPath(ancestors, key));
        }
        if (type === 'changed') {
          return textWnenUpdated(
            builtPath(ancestors, key),
            convertComplexValue(value1),
            convertComplexValue(value2),
          );
        }
      }
      const copyOfAncestors = [...ancestors];
      copyOfAncestors.push(key);
      return iter(value, copyOfAncestors);
    });
    return plainDiff.join('\n');
  };
  return iter(difference, []);
};

export default plain;
