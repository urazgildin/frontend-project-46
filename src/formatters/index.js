import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const chooseFormater = (diff, formater) => {
  switch (formater) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    case 'bare':
      return diff;
    default:
      throw new Error(`output format ${formater} not found`);
  }
};

export default chooseFormater;
