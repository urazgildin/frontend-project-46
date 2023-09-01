import { test, expect } from '@jest/globals';
import { readFixtureFile } from '../src/utils.js';
import getDifferencies from '../src/index.js';
import stylish from '../src/formatters/stylish.js';

test('get differencies of two files', () => {
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json')).toEqual(readFixtureFile('expectedFile2.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', stylish)).toEqual(readFixtureFile('expectedFile2.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', stylish)).toEqual(readFixtureFile('expectedFile2.txt'));
});
