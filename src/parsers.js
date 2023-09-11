import yaml from 'js-yaml';

const generateObject = () => ({
  json: function parseJson(data) {
    return JSON.parse(data);
  },
  yaml: function parseYaml(data) {
    return yaml.load(data);
  },
  yml: function parseYml(data) {
    return yaml.load(data);
  },
});

const parseData = (data, typeOfFile) => {
  const objOfFunctions = generateObject();
  const func = objOfFunctions[typeOfFile];
  return func(data);
};

export default parseData;
