const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function parseFile(filepath) {
  const ext = path.extname(filepath);
  if (['.yml', '.yaml'].includes(ext)) {
    return yaml.load(fs.readFileSync(filepath, 'utf8'));
  }

  return JSON.parse(fs.readFileSync(filepath));
}

module.exports.parseFile = parseFile;
