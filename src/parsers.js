import yaml from 'js-yaml';

const parsers = {
  yaml: yaml.load,
  json: JSON.parse,
};

const getParser = (format) => (parsers[format]);

export default getParser;
