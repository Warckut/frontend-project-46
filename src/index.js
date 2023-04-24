import fs from 'fs';
import path from 'path';

import buildTree from './buildTree.js';
import createFormatter from './formatters/index.js';
import getParser from './parsers.js';

const getFileFormat = (ext) => ({
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.json': 'json',
}[ext]);

const getDataFile = (filepath) => {
  const fileFormat = getFileFormat(path.extname(filepath));
  const parser = getParser(fileFormat);
  return parser(fs.readFileSync(filepath, 'utf-8'));
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);

  const formOutput = createFormatter(formatName);
  return formOutput(buildTree(data1, data2));
};

export default genDiff;
