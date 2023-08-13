import { test, expect } from '@jest/globals';
import { readFixtureFile } from '../src/utils.js';
import getDifferencies from '../src/gendiff.js';

test('get differencies of two files', () => {
  expect(getDifferencies('__fixtures__/file1.json', '__fixtures__/file1.json')).toEqual(readFixtureFile('expectedFile.json'));
});
