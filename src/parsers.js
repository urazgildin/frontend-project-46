import yaml from 'js-yaml';

const getParsedData = (data, fileExt) => {
  let parsedData;
  if (fileExt === '.json') {
    parsedData = JSON.parse(data);
  }
  if (fileExt === '.yaml' || fileExt === '.yml') {
    parsedData = yaml.load(data);
  }
  return parsedData;
};

export default getParsedData;
