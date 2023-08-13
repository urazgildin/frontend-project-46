import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { cwd } from 'node:process';
import { fileURLToPath } from 'node:url';

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

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '__fixtures__', filename);
};

const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf8').trim();

export { getAbsolutePath, getParsedData, readFixtureFile };
