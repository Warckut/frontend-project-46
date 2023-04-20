#!/usr/bin/env node
import { program } from 'commander';

import genDiff from '../src/index.js';

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const output = genDiff(filepath1, filepath2, program.opts().format);
    console.log(output);
  })
  .parse(process.argv);
