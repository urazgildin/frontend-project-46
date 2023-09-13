import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@jest/globals';
import getDifferencies from '../src/index.js';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return join(__dirname, '..', '__fixtures__', filename);
};

const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf8').trim();

test.each([
  ['__fixtures__/file3.json', '__fixtures__/file4.json', 'expectedFileStylish.txt', 'stylish'],
  ['__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'expectedFileStylish.txt', 'stylish'],
  ['__fixtures__/file3.yml', '__fixtures__/file4.yml', 'expectedFileStylish.txt', 'stylish'],
  ['__fixtures__/file3.json', '__fixtures__/file4.json', 'expectedFilePlain.txt', 'plain'],
  ['__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'expectedFilePlain.txt', 'plain'],
  ['__fixtures__/file3.json', '__fixtures__/file4.json', 'expectedFileJson.txt', 'json'],
])('get differencies of two files', (file1, file2, expected, formater) => {
  expect(getDifferencies(file1, file2, formater)).toEqual(readFixtureFile(expected));
});

test('throw cases', () => {
  expect(() => getDifferencies('__fixtures__/file1.txt', '__fixtures__/file2.txt')).toThrow();
  expect(() => getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', 'abcent')).toThrow();
});
