#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('CLI to compares two files.')
  .version('1.0.0');

program.description('Compares two configuration files and shows a difference.');

program.parse();
