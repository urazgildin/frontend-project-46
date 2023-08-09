import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const isAbsolute = (path) => path.startsWith('/');

const getAbsolutePath = (path) => {
  if (!isAbsolute(path)) {
    return resolve(cwd(), path);
  }
  return path;
};

const getParsedData = (path) => {
  const data = readFileSync(path, 'utf8');
  const parsedData = JSON.parse(data);
  return parsedData;
};

export { isAbsolute, getAbsolutePath, getParsedData };
