import stylish from './stylish.js';
import plain from './plain.js';

const objectOfFormaters = {
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => JSON.stringify(data),
};

const chooseFormater = (diff, formater) => objectOfFormaters[formater](diff);

export default chooseFormater;
