import yaml from 'js-yaml';

const parsers = {
  yml: yaml.load,
  yaml: yaml.load,
  json: JSON.parse,
};

const getParser = (format) => (parsers[format]);

export default getParser;
