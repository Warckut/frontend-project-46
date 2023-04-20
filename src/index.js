import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import TypesDiff from './TypesDiff.js';
import createFormatter from './formatters/index.js';
import getParser from './parsers.js';

const getDataFile = (filepath) => {
  const parser = getParser(path.extname(filepath));
  return parser(fs.readFileSync(filepath, 'utf-8'));
};

const getTypeDiff = (val1, val2) => {
  if (val1 === undefined) return TypesDiff.ADDED;
  if (val2 === undefined) return TypesDiff.REMOVED;
  if (_.isPlainObject(val1) && _.isPlainObject(val2)) return TypesDiff.BOTH_OBJECTS;
  if (val1 === val2) return TypesDiff.UNCHANGED;
  return TypesDiff.UPDATED;
};

const objToArray = (node) => {
  if (!_.isPlainObject(node)) return node;

  return Object
    .entries(node)
    .map(([key, value]) => ({ key, typeDiff: TypesDiff.UNCHANGED, value: objToArray(value) }));
};

const createDiffGenerator = (typeDiff) => {
  switch (typeDiff) {
    case TypesDiff.ADDED:
      return (key, val1, val2) => ({
        key,
        typeDiff,
        value: objToArray(val2),
      });
    case TypesDiff.REMOVED:
      return (key, val1) => ({
        key,
        typeDiff,
        value: objToArray(val1),
      });
    case TypesDiff.BOTH_OBJECTS:
      return (key, val1, val2, recFunc) => ({
        key,
        typeDiff,
        value: recFunc(val1, val2),
      });
    case TypesDiff.UNCHANGED:
      return (key, val1) => ({
        key,
        typeDiff,
        value: objToArray(val1),
      });
    case TypesDiff.UPDATED:
      return (key, val1, val2) => ({
        key,
        typeDiff,
        value: objToArray(val1),
        assignedValue: objToArray(val2),
      });
    default:
      throw new Error();
  }
};

const buildTree = (node1, node2) => {
  const keys = _.union(Object.keys(node1), Object.keys(node2));
  const sortedKeys = _.sortBy(keys);

  const children = sortedKeys.reduce((acc, key) => {
    const val1 = node1[key];
    const val2 = node2[key];

    const generateDiff = createDiffGenerator(getTypeDiff(val1, val2));
    const diff = generateDiff(key, val1, val2, buildTree);
    return [...acc, diff];
  }, []);

  return children;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);

  const formOutput = createFormatter(formatName);
  return formOutput(buildTree(data1, data2));
};

export default genDiff;
