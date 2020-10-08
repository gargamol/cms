const deepAssign = require('deep-assign');

const platformResolvers = require('./platform/resolvers');

module.exports = deepAssign(
  platformResolvers,
);
