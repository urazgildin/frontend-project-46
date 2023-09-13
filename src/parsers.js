import yaml from 'js-yaml';

const generateObjectOfParsers = () => ({
  json: (data) => JSON.parse(data),
  yaml: (data) => yaml.load(data),
  yml: (data) => yaml.load(data),
});

const parseData = (data, typeOfFile) => generateObjectOfParsers()[typeOfFile](data);

export default parseData;
