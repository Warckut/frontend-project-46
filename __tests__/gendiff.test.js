import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import genDiff from '../lib/genDiff.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff (json)', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  const expected = readFile('stylishFormatResult.txt');
  expect(received).toEqual(expected);
});

test('genDiff (yml/yaml)', () => {
  const received = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  const expected = readFile('stylishFormatResult.txt');
  expect(received).toEqual(expected);
});

test('genDiff plain format', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expected = readFile('plainFormatResult.txt');
  expect(received).toEqual(expected);
});

test('genDiff json format', () => {
  const received = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const expected = readFile('jsonFormatResult.json');
  expect(received).toEqual(expected);
});
