const fs = require('fs');
const { genDiff } = require('../lib/genDiff.js');

test('genDiff', () => {
  const df1 = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/file1.json`));
  const df2 = JSON.parse(fs.readFileSync(`${__dirname}/__fixtures__/file2.json`));

  const expectedValue = '- follow false\n'
    + '  host hexlet.io\n'
    + '- proxy 123.234.53.22\n'
    + '- timeout 50\n'
    + '+ timeout 20\n'
    + '+ verbose true\n';

  expect(genDiff(df1, df2)).toEqual(expectedValue);
});
