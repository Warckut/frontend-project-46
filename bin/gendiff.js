#!/usr/bin/env node

const program = require('commander');

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);

// const opts = program.opts();

// if (opts.code) console.log("YOU dsds");
