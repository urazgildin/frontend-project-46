import stylish from './stylish.js';
import plain from './plain.js';

const generateObject = () => ({
  stylish: function makeStylish(data) {
    return stylish(data);
  },
  plain: function makePlain(data) {
    return plain(data);
  },
  json: function makeJson(data) {
    return JSON.stringify(data);
  },
});

const chooseFormater = (diff, formater) => {
  const objOfFunctions = generateObject();
  const func = objOfFunctions[formater];
  return func(diff);
};

export default chooseFormater;
