import _ from 'lodash';

import TypesDiff from './TypesDiff.js';

const objToArray = (node) => {
  if (!_.isPlainObject(node)) return node;

  return Object
    .entries(node)
    .map(([key, value]) => ({
      key,
      typeDiff: TypesDiff.UNCHANGED,
      value: objToArray(value),
    }));
};

const rulesBuildingNodes = [
  {
    check: (key, node1) => (!_.has(node1, key)),
    process: (key, node1, node2) => ({
      key,
      typeDiff: TypesDiff.ADDED,
      value: objToArray(node2[key]),
    }),
  },
  {
    check: (key, node1, node2) => (!_.has(node2, key)),
    process: (key, node1) => ({
      key,
      typeDiff: TypesDiff.REMOVED,
      value: objToArray(node1[key]),
    }),
  },
  {
    check: (key, node1, node2) => (_.isPlainObject(node1[key]) && _.isPlainObject(node2[key])),
    process: (key, node1, node2, recFunc) => ({
      key,
      typeDiff: TypesDiff.BOTH_OBJECTS,
      value: recFunc(node1[key], node2[key]),
    }),
  },
  {
    check: (key, node1, node2) => (node1[key] === node2[key]),
    process: (key, node1) => ({
      key,
      typeDiff: TypesDiff.UNCHANGED,
      value: objToArray(node1[key]),
    }),
  },
  {
    check: (key, node1, node2) => (node1[key] !== node2[key]),
    process: (key, node1, node2) => ({
      key,
      typeDiff: TypesDiff.UPDATED,
      value: objToArray(node1[key]),
      assignedValue: objToArray(node2[key]),
    }),
  },
];

const buildTree = (node1, node2) => {
  const keys = _.union(Object.keys(node1), Object.keys(node2));
  const sortedKeys = _.sortBy(keys);

  const children = sortedKeys.reduce((acc, key) => {
    const [rule] = rulesBuildingNodes.filter((el) => el.check(key, node1, node2));
    return [...acc, rule.process(key, node1, node2, buildTree)];
  }, []);

  return children;
};

export default buildTree;
