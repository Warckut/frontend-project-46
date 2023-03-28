const { Operations } = require('../Operations.js');

const stylish = (tree, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!Array.isArray(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * (spacesCount);
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = currentValue
      .map(({
        key,
        typeDiff,
        value,
        assignedValue,
      }) => {
        switch (typeDiff) {
          case Operations.ADDED:
            return `${currentIndent}+ ${key}: ${iter(value, depth + 2)}`;
          case Operations.REMOVED:
            return `${currentIndent}- ${key}: ${iter(value, depth + 2)}`;
          case Operations.NOT_CHANGED:
            return `${currentIndent}  ${key}: ${iter(value, depth + 2)}`;
          case Operations.UPDATED:
            return `${currentIndent}- ${key}: ${iter(value, depth + 2)}\n`
              + `${currentIndent}+ ${key}: ${iter(assignedValue, depth + 2)}`;
          default:
            return '';
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(tree, 1);
};

module.exports.stylish = stylish;
