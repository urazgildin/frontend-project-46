import { test, expect } from '@jest/globals';
import { readFixtureFile } from '../src/utils.js';
import getDifferencies from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import json from '../src/formatters/json.js';

test('get differencies of two files', () => {
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json')).toEqual(readFixtureFile('expectedFile2.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', stylish)).toEqual(readFixtureFile('expectedFile2.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', stylish)).toEqual(readFixtureFile('expectedFile2.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', plain)).toEqual(readFixtureFile('expectedFile3.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', plain)).toEqual(readFixtureFile('expectedFile3.txt'));
});
