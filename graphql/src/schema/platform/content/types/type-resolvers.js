const deepAssign = require('deep-assign');

const articleResolvers = require('./article/article-resolvers');
//const companyResolvers = require('./company/company-resolvers');

module.exports = deepAssign(
  articleResolvers,
);