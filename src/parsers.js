import yaml from 'js-yaml';

const parsers = {
  '.yml': yaml.load,
  '.yaml': yaml.load,
  '.json': JSON.parse,
};

const getParser = (ext) => (parsers[ext]);

export default getParser;
