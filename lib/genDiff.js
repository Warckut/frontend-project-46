const _ = require('lodash');

const { createFormatter } = require('./formatters/index.js');
const { Operations } = require('./Operations.js');

const genDiff = (dF1, dF2, formatName = 'stylish') => {
  const formOutput = createFormatter(formatName);

  const objToArray = (node) => {
    if (!_.isObject(node)) return node;

    return Object
      .entries(node)
      .map(([key, value]) => ({ key, typeDiff: Operations.NOT_CHANGED, value: objToArray(value) }));
  };

  const recFunc = (node1, node2) => {
    const keysFile1 = Object.keys(node1);
    const keysFile2 = Object.keys(node2);

    const f1Only = _.without(keysFile1, ...keysFile2)
      .map((key) => ({ key, typeDiff: Operations.REMOVED, value: objToArray(node1[key]) }));

    const f2Only = _.without(keysFile2, ...keysFile1)
      .map((key) => ({ key, typeDiff: Operations.ADDED, value: objToArray(node2[key]) }));

    const intersection = keysFile1.filter((key) => keysFile2.includes(key));

    const result = intersection.reduce((acc, key) => {
      const valueF1 = node1[key];
      const valueF2 = node2[key];
      const diffs = [];
      if (_.isEqual(valueF1, valueF2)) {
        diffs.push({
          key,
          typeDiff: Operations.NOT_CHANGED,
          value: objToArray(valueF1),
        });
      } else if (_.isObject(valueF1) && _.isObject(valueF2)) {
        diffs.push({
          key,
          typeDiff: Operations.NOT_CHANGED,
          value: recFunc(valueF1, valueF2),
        });
      } else {
        diffs.push({
          key,
          typeDiff: Operations.UPDATED,
          value: objToArray(valueF1),
          assignedValue: objToArray(valueF2),
        });
      }
      return [...acc, ...diffs];
    }, [...f1Only, ...f2Only]);
    return _.sortBy(result, (obj) => obj.key);
  };

  const sortedArr = recFunc(dF1, dF2);

  return formOutput(sortedArr);
};

module.exports = {
  genDiff,
};
