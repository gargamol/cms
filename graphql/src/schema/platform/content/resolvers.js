// This file is essentially the 'glue' linking outside typeDefs to inside resolvers 
// (may move logic into here at some point)

// @jpdev - not convinced this include of logic and then 'shorter' resolver file is great
// @jpdev - however putting logic all here isn't much better and code formatting has be redone to support
// @jpdev - may come down to how much of b4 code we use and what that expects (they do alot of it here)
const { ResolverLogic } = require('./resolverLogic');

const resolveType = async ({ type }) => `Content${type}`;

const contentResolvers = {

  Content: {
    __resolveType: resolveType,
  },

  Query: {
    getContentItem: (parent, variables, context, info) => ResolverLogic.getContentItem(parent, variables, context, info),
    allPublishedContent: (parent, variables, context, info) => ResolverLogic.allPublishedContent(parent, variables, context, info),
  },
};

module.exports = {
  contentResolvers,
};
