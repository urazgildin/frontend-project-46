import _ from 'lodash';
import getDifferencies from '../index.js';

const builtPath = (currentPath, key) => {
  const newArr = [...currentPath];
  newArr.push(key);
  return newArr.join('.');
};

const textWnenAdded = (key, value) => {
  let valueRed;
  if (typeof value === 'string' && value !== '[complex value]') {
    valueRed = `'${value}'`;
  } else {
    valueRed = value;
  }
  return `Property '${key}' was added with value: ${valueRed}`;
};

const textWnenRemoved = (key) => `Property '${key}' was removed`;
const textWnenUpdated = (key, value1, value2) => {
  let value1Red;
  let value2Red;
  if (typeof value1 === 'string' && value1 !== '[complex value]') {
    value1Red = `'${value1}'`;
  } else {
    value1Red = value1;
  }
  if (typeof value2 === 'string' && value2 !== '[complex value]') {
    value2Red = `'${value2}'`;
  } else {
    value2Red = value2;
  }
  return `Property '${key}' was updated. From ${value1Red} to ${value2Red}`;
};

const makeCorrect = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff) => {
  const iter = (difff, currentPath) => {
    const fiteredColl = difff.filter(({ type }) => type !== 'unchanged');
    const mappedColl = fiteredColl.flatMap(({ key, value, value1, value2, type }) => {
      if (type !== 'nested') {
        if (type === 'added') {
          return textWnenAdded(builtPath(currentPath, key), makeCorrect(value));
        }
        if (type === 'deleted') {
          return textWnenRemoved(builtPath(currentPath, key));
        }
        if (type === 'changed') {
          return textWnenUpdated(builtPath(currentPath, key), makeCorrect(value1), makeCorrect(value2));
        }
      }
      const newColl = [...currentPath];
      newColl.push(key);
      return iter(value, newColl);
    });
    return mappedColl.join('\n');
  };
  return iter(diff, []);
};

export default plain;
