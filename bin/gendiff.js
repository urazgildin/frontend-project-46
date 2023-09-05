#!/usr/bin/env node

import { program } from 'commander';
import getDifferencies from '../src/gendiff.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    console.log(getDifferencies(filepath1, filepath2, program.opts().format));
  });
program.parse(process.argv);
