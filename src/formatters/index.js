import stylish from './stylish.js';
import plain from './plain.js';

const formats = {
  stylish,
  plain,
  json: JSON.stringify,
};

const createFormatter = (formatName) => (formats[formatName]);

export default createFormatter;
