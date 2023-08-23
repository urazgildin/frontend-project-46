import { test, expect } from '@jest/globals';
import { readFixtureFile } from '../src/utils.js';
import getDifferencies from '../src/gendiff.js';

test('get differencies of two files', () => {
  expect(getDifferencies('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFixtureFile('expectedFile.txt'));
  expect(getDifferencies('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(readFixtureFile('expectedFile.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json')).toEqual(readFixtureFile('expectedFile2.txt'));
});
