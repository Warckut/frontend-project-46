const _ = require('lodash');

const gendiff = (dF1, dF2) => {
  const keysFile1 = Object.keys(dF1);
  const keysFile2 = Object.keys(dF2);

  const f1Only = _.without(keysFile1, ...keysFile2)
    .map((key) => ({ key, typeDiff: '-', value: dF1[key] }));

  const f2Only = _.without(keysFile2, ...keysFile1)
    .map((key) => ({ key, typeDiff: '+', value: dF2[key] }));

  const intersection = keysFile1.filter((key) => keysFile2.includes(key));

  const result = intersection.reduce((acc, key) => {
    const valueF1 = dF1[key];
    const valueF2 = dF2[key];
    const diffs = (valueF1 === valueF2) ? [
      { key, typeDiff: ' ', value: valueF1 },
    ] : [
      { key, typeDiff: '-', value: valueF1 },
      { key, typeDiff: '+', value: valueF2 },
    ];
    return [...acc, ...diffs];
  }, [...f1Only, ...f2Only]);

  return _.sortBy(result, (obj) => obj.key);
};

module.exports.gendiff = gendiff;
