const deepAssign = require('deep-assign');

const { contentResolvers } = require('./content/resolvers');

// @jpdev - still not convinced we should do class export instead of code within the export, kindof forcing it for these simplier cases holding out that it might make more sense in the complicated parts down the line
const { assetResolvers } = require('./asset/resolvers');
const { taxonomyResolvers } = require('./taxonomy/resolvers');
const { securityResolvers } = require('./security/resolvers');

module.exports = deepAssign(
  contentResolvers,
  assetResolvers,
  taxonomyResolvers,
  securityResolvers,
);
