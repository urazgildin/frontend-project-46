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
  ['file3.json', 'file4.json', 'expectedFileStylish.txt', 'stylish'],
  ['file3.yaml', 'file4.yaml', 'expectedFileStylish.txt', 'stylish'],
  ['file3.yml', 'file4.yml', 'expectedFileStylish.txt', 'stylish'],
  ['file3.json', 'file4.json', 'expectedFilePlain.txt', 'plain'],
  ['file3.yaml', 'file4.yaml', 'expectedFilePlain.txt', 'plain'],
  ['file3.json', 'file4.json', 'expectedFileJson.txt', 'json'],
])('get differencies of two files', (file1, file2, expected, formater) => {
  expect(getDifferencies(getFixturePath(file1), getFixturePath(file2), formater))
    .toEqual(readFixtureFile(expected));
});

test.each([
  ['file1.txt', 'file2.txt', 'stylish'],
  ['file3.json', 'file4.json', 'abcent'],
])('throw cases', (file1, file2, formater) => {
  expect(() => getDifferencies(getFixturePath(file1), getFixturePath(file2), formater)).toThrow();
});
