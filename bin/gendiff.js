#!/usr/bin/env node

import { program } from 'commander';
import getDifferencies from '../src/gendiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    if (options.format === 'exe' || options.format === undefined) {
      getDifferencies(filepath1, filepath2);
    }
  });
program.parse(process.argv);
