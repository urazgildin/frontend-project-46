import { test, expect } from '@jest/globals';
import { readFixtureFile } from '../src/utils.js';
import getDifferencies from '../src/recursiveGendiff.js';
import stylish from '../src/stylish.js';

test('get differencies of two files', () => {
  expect(stylish(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json'))).toEqual(readFixtureFile('expectedFile2.txt'));
});
