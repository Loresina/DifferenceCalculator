#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

// const path1 = 'examples/file1.json';
// const path2 = 'examples/file2.json';

// genDiff(path1, path2);

program
  .name('gendiff')
  .description('CLI to compares two files.')
  .version('1.0.0');

program.description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to first file for comparison')
  .argument('<filepath2>', 'path to secorn file for comparison')
  .option('-f, -f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  });

program.parse();
