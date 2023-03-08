const { gendiff } = require('../lib/gendiff.js');

let dF1;
let dF2;

beforeEach(() => {
  dF1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  dF2 = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
});

test('test', () => {
  expect(gendiff(dF1, dF2)).toEqual([
    { key: 'follow', typeDiff: '-', value: false },
    { key: 'host', typeDiff: ' ', value: 'hexlet.io' },
    { key: 'proxy', typeDiff: '-', value: '123.234.53.22' },
    { key: 'timeout', typeDiff: '-', value: 50 },
    { key: 'timeout', typeDiff: '+', value: 20 },
    { key: 'verbose', typeDiff: '+', value: true },
  ]);
});
