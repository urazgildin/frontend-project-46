import yaml from 'js-yaml';

const objectOfParsers = {
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
};

const parseData = (data, typeOfFile) => objectOfParsers[typeOfFile](data);

export default parseData;
