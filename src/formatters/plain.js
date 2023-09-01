import _ from 'lodash';
import getDifferencies from '../recursiveGendiff.js';

const plain = (diff) => {
  const textWnenAdded = (key, value) => `Property ${key} was added with value: ${value}`;
  const textWnenRemoved = (key) => `Property ${key} was removed`;
  const textWnenUpdated = (key, value1, value2) => `Property ${key} was updated. From ${value1} to ${value2}`;
  const iter = (difff) => {
    const reducedArr = difff.reduce((acc, { key, value }) => {
      if (!Object.hasOwn(acc, key)) {
        acc[key] = [];
      }
      acc[key].push(value);
      return acc;
    }, {});
    console.log(reducedArr);
    const filteredArr = Object.keys(reducedArr).filter((item) => reducedArr[item].length > 1);
    const mappedColl = difff.map(({ key, value, type }) => {
      if (type !== 'nested') {
        if (type === 'added' && !filteredArr.includes(key)) {
          if (!_.isObject(value)) {
            return textWnenAdded(key, value);
          }
          return textWnenAdded(key, '[complex value]');
        }
        if (type === 'deleted' && !filteredArr.includes(key)) {
          return textWnenRemoved(key);
        }
        if (type === 'deleted' && filteredArr.includes(key)) {
          return [];
        }
        if (type === 'added' && filteredArr.includes(key)) {
          return textWnenUpdated(key, reducedArr[key][1], reducedArr[key][2]);
        }
      }
      return iter(value);
    });
    console.log(mappedColl);
    return mappedColl;
  };
  return iter(diff);
};

console.log(plain(getDifferencies('../../__fixtures__/file3.json', '../../__fixtures__/file4.json')));
