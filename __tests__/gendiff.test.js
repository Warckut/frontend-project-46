const { genDiff } = require('../lib/genDiff.js');
const { parseFile } = require('../lib/parsers.js');

let expectedValue;
beforeEach(() => {
  expectedValue = '- follow false\n'
    + '  host hexlet.io\n'
    + '- proxy 123.234.53.22\n'
    + '- timeout 50\n'
    + '+ timeout 20\n'
    + '+ verbose true\n';
});

test('genDiff (json)', () => {
  const df1 = parseFile(`${__dirname}/__fixtures__/file1.json`);
  const df2 = parseFile(`${__dirname}/__fixtures__/file2.json`);
  expect(genDiff(df1, df2)).toEqual(expectedValue);
});

test('genDiff (yml/yaml)', () => {
  const df1 = parseFile(`${__dirname}/__fixtures__/file1.yml`);
  const df2 = parseFile(`${__dirname}/__fixtures__/file2.yml`);
  expect(genDiff(df1, df2)).toEqual(expectedValue);
});
