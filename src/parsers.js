import yaml from 'js-yaml';

const getData = (data, fileExt) => {
  switch (fileExt) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
      return yaml.load(data);
    case '.yml':
      return yaml.load(data);
    default:
      throw new Error(`${fileExt} is invalid extention`);
  }
};

export default getData;
