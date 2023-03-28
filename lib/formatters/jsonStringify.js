const _ = require('lodash');

const jsonStringify = (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `"${currentValue}"`;
    }

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val], i, arr) => `${currentIndent}"${key}": ${iter(val, depth + 1)}${(i === arr.length - 1) ? '' : ','}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};

module.exports.jsonStringify = jsonStringify;
