import _ from 'lodash';
import { getAbsolutePath, getParsedData } from './utils.js';

const getDifferencies = (filepath1, filepath2) => {
  const obj1 = getParsedData(getAbsolutePath(filepath1));
  const obj2 = getParsedData(getAbsolutePath(filepath2));

  const keys = [...Object.keys(obj1), ...Object.keys(obj2)];
  const sortedKeys = _.sortBy(keys);
  const uniqKeys = _.uniq(sortedKeys);
  const dublicats = sortedKeys.filter((key, index) => sortedKeys.indexOf(key) !== index);

  const resultAsArr = uniqKeys.reduce((acc, key) => {
    if (dublicats.includes(key)) {
      if (obj1[key] === obj2[key]) {
        acc.push(`  ${key}: ${obj1[key]}`);
      } else {
        acc.push(`- ${key}: ${obj1[key]}`, `+ ${key}: ${obj2[key]}`);
      }
    }

    if (!dublicats.includes(key)) {
      if (Object.hasOwn(obj1, key)) {
        acc.push(`- ${key}: ${obj1[key]}`);
      } else {
        acc.push(`+ ${key}: ${obj2[key]}`);
      }
    }
    return acc;
  }, []);

  const resultAsString = resultAsArr.join('\n  ');
  console.log(`{\n  ${resultAsString}\n}`);
  return `{\n  ${resultAsString}\n}`;
};

export default getDifferencies;
