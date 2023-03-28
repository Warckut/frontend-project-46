const { stylish } = require('./stylish.js');
const { plain } = require('./plain.js');
const { jsonStringify } = require('./jsonStringify.js');

const createFormatter = (formatName) => {
  switch (formatName) {
    case 'plain':
      return plain;
    case 'json':
      return jsonStringify;
    case 'stylish':
      return stylish;
    default:
      return stylish;
  }
};

module.exports.createFormatter = createFormatter;
