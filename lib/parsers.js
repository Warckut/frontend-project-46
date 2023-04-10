import yaml from 'js-yaml';

function getParser(ext) {
  if (['.yml', '.yaml'].includes(ext)) {
    return (data) => yaml.load(data);
  }

  return (data) => JSON.parse(data);
}

export default getParser;
