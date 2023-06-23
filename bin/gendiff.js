#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .name('gendiff')
  .description('CLI to compares two files.')
  .version('1.0.0');

program.description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to first file for comparison')
  .argument('<filepath2>', 'path to secorn file for comparison')
  .option('-f, --format <type>', 'output format (default: "stylish")')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();
