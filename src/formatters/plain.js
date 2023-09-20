import _ from 'lodash';

const builtNameOfProperty = (currentPath, key) => {
  const newArr = [...currentPath, key];
  return newArr.join('.');
};

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const textWnenAdded = (name, value) => `Property '${name}' was added with value: ${stringify(value)}\n`;
const textWnenRemoved = (name) => `Property '${name}' was removed\n`;
const textWnenUpdated = (name, value1, value2) => `Property '${name}' was updated. From ${stringify(value1)} to ${stringify(value2)}\n`;

const plain = (difference) => {
  const iter = (diff, ancestors) => {
    const plainDiff = diff.flatMap(({
      type, key, children, value, value1, value2,
    }) => {
      switch (type) {
        case 'unchanged':
          return null;
        case 'added':
          return textWnenAdded(builtNameOfProperty(ancestors, key), value);
        case 'deleted':
          return textWnenRemoved(builtNameOfProperty(ancestors, key));
        case 'changed':
          return textWnenUpdated(builtNameOfProperty(ancestors, key), value1, value2);
        case 'nested':
          return iter(children, [...ancestors, key]);
        default:
          throw new Error(`Unknown type: '${type}'!`);
      }
    });
    return plainDiff.join('');
  };
  return iter(difference, []).replace(/\n$/, '');
};

export default plain;
