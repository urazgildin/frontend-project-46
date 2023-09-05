import { test, expect } from '@jest/globals';
import { readFixtureFile } from '../src/utils.js';
import getDifferencies from '../src/gendiff.js';

test('get differencies of two files', () => {
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.yaml')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', 'stylish')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'stylish')).toEqual(readFixtureFile('expectedFileStylish.txt'));
  expect(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.json', 'plain')).toEqual(readFixtureFile('expectedFilePlain.txt'));
  expect(getDifferencies('__fixtures__/file3.yaml', '__fixtures__/file4.yaml', 'plain')).toEqual(readFixtureFile('expectedFilePlain.txt'));
  const data1 = getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'bare');
  const data2 = JSON.parse(getDifferencies('__fixtures__/file3.json', '__fixtures__/file4.yaml', 'json'));
  expect(data1).toEqual(data2);
});
