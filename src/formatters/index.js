import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormater = (diff, formater) => {
  if (formater === 'stylish') {
    return stylish(diff);
  }
  if (formater === 'plain') {
    return plain(diff);
  }
  if (formater === 'json') {
    return json(diff);
  }
};

export default chooseFormater;
