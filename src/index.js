import { readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import { cwd } from 'node:process';
import parseData from './parsers.js';
import buildTree from './builtTree.js';
import chooseFormater from './formatters/index.js';

const getFullPath = (path) => resolve(cwd(), path);

const getFormat = (path) => extname(path).slice(1);

const readFileData = (path) => {
  const data = readFileSync(getFullPath(path), 'utf8');
  return parseData(data, getFormat(path));
};

const getDifferencies = (filepath1, filepath2, formater = 'stylish') => {
  const obj1 = readFileData(filepath1);
  const obj2 = readFileData(filepath2);

  const diff = buildTree(obj1, obj2);
  return chooseFormater(diff, formater);
};

export default getDifferencies;
