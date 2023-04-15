import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import TypeDiff from './TypeDiff.js';
import createFormatter from './formatters/index.js';
import getParser from './parsers.js';

const getDataFile = (filepath) => {
  const toParse = getParser(path.extname(filepath));
  return toParse(fs.readFileSync(filepath, 'utf-8'));
};

const getTypeDiff = (val1, val2) => {
  if (val1 === undefined) return TypeDiff.ADDED;
  if (val2 === undefined) return TypeDiff.REMOVED;
  if (_.isPlainObject(val1) && _.isPlainObject(val2)) return TypeDiff.BOTH_OBJECTS;
  if (val1 === val2) return TypeDiff.UNCHANGED;
  return TypeDiff.UPDATED;
};

const objToArray = (node) => {
  if (!_.isPlainObject(node)) return node;

  return Object
    .entries(node)
    .map(([key, value]) => ({ key, typeDiff: TypeDiff.UNCHANGED, value: objToArray(value) }));
};

const createDiffGenerator = (typeDiff) => {
  switch (typeDiff) {
    case TypeDiff.ADDED:
      return (key, val1, val2) => ({
        key,
        typeDiff,
        value: objToArray(val2),
      });
    case TypeDiff.REMOVED:
      return (key, val1) => ({
        key,
        typeDiff,
        value: objToArray(val1),
      });
    case TypeDiff.BOTH_OBJECTS:
      return (key, val1, val2, recFunc) => ({
        key,
        typeDiff,
        value: recFunc(val1, val2),
      });
    case TypeDiff.UNCHANGED:
      return (key, val1) => ({
        key,
        typeDiff,
        value: objToArray(val1),
      });
    case TypeDiff.UPDATED:
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

const genDiff = (filepath1, filepath2, formatName) => {
  const data1 = getDataFile(filepath1);
  const data2 = getDataFile(filepath2);

  const formOutput = createFormatter(formatName);
  return formOutput(buildTree(data1, data2));
};

export default genDiff;
