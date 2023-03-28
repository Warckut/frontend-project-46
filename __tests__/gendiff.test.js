const fs = require('fs');
const path = require('path');

const { genDiff } = require('../lib/genDiff.js');
const { parseFile } = require('../lib/parsers.js');

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff (json)', () => {
  const df1 = parseFile(getFixturePath('file1.json'));
  const df2 = parseFile(getFixturePath('file2.json'));
  const expected = readFile('stylishFormatResult.txt');
  expect(genDiff(df1, df2)).toEqual(expected);
});

test('genDiff (yml/yaml)', () => {
  const df1 = parseFile(getFixturePath('file1.yml'));
  const df2 = parseFile(getFixturePath('file2.yml'));
  const expected = readFile('defaultFormatResult.txt');
  expect(genDiff(df1, df2)).toEqual(expected);
});

test('genDiff plain format', () => {
  const df1 = parseFile(getFixturePath('file1.json'));
  const df2 = parseFile(getFixturePath('file2.json'));
  const expected = readFile('plainFormatResult.txt');
  expect(genDiff(df1, df2, 'plain')).toEqual(expected);
});

test('genDiff json format', () => {
  const df1 = parseFile(getFixturePath('file1.json'));
  const df2 = parseFile(getFixturePath('file2.json'));
  const expected = readFile('jsonFormatResult.json');
  expect(genDiff(df1, df2, 'json')).toEqual(expected);
});
