const _ = require('lodash');
const { Operations } = require('../Operations.js');

const getValueOutput = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, prevKeys = '') => {
    if (!Array.isArray(node)) {
      return '';
    }

    const lines = node
      .map(({
        key,
        typeDiff,
        value,
        assignedValue,
      }) => {
        const keys = `${prevKeys}${key}`;
        const value1 = getValueOutput(value);
        const value2 = getValueOutput(assignedValue);
        switch (typeDiff) {
          case Operations.ADDED:
            return `Property '${keys}' was added with value: ${value1}`;
          case Operations.REMOVED:
            return `Property '${keys}' was removed`;
          case Operations.NOT_CHANGED:
            return iter(value, `${keys}.`);
          case Operations.UPDATED:
            return `Property '${keys}' was updated. From ${value1} to ${value2}`;
          default:
            return '';
        }
      });

    return lines.filter((el) => el.length > 0).join('\n');
  };

  return iter(tree);
};

module.exports.plain = plain;
