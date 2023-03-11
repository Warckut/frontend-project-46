#!/usr/bin/env node

const program = require('commander');

const { genDiff } = require('../lib/genDiff.js');
const { parseFile } = require('../lib/parsers.js');

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const dF1 = parseFile(filepath1);
    const dF2 = parseFile(filepath2);

    const diffs = genDiff(dF1, dF2);

    console.log(diffs);
  });

program.parse(process.argv);
