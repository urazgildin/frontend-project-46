import stylish from './stylish.js';
import plain from './plain.js';

const generateObjectofFormaters = () => ({
  stylish: (data) => stylish(data),
  plain: (data) => plain(data),
  json: (data) => JSON.stringify(data),
});

const chooseFormater = (diff, formater) => generateObjectofFormaters()[formater](diff);

export default chooseFormater;
