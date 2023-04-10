import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: (value) => JSON.stringify(value, null, 2),
};

const createFormatter = (formatName) => (formats[formatName]);

export default createFormatter;
