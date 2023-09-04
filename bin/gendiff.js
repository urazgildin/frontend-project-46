#!/usr/bin/env node

import { program } from 'commander';
import getDifferencies from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(getDifferencies(filepath1, filepath2, program.format));
  });
program.parse(process.argv);
