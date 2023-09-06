import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@jest/globals';
import getDifferencies from '../src/gendiff.js';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '__fixtures__', filename);
};

const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf8').trim();

test('get differencies of two files', () => {
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.yaml')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(() => getDifferencies('__fixtures__/file1.txt', '__fixtures__/file2.txt')).toThrow();
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'stylish')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.yml', '__fixtures__/file4.yml', 'stylish')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toEqual(readFixtureFile('expectedFilePlain.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'plain')).toEqual(readFixtureFile('expectedFilePlain.txt'));
  expect(() => getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', 'abcent')).toThrow();
  const data1 = getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'bare');
  const data2 = JSON.parse(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'json'));
  expect(data1).toEqual(data2);
});
