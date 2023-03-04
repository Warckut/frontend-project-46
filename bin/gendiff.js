#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const { gendiff } = require('../src/index.js');

const getDataFile = (filepath) => JSON.parse(fs.readFileSync(filepath));

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const dF1 = getDataFile(filepath1);
    const dF2 = getDataFile(filepath2);

    const diffs = gendiff(dF1, dF2);

    diffs.forEach(({ key, typeDiff, value }) => {
      console.log(`${typeDiff} ${key} ${value}`);
    });
  });

program.parse(process.argv);
