const deepAssign = require('deep-assign');
const typeResolvers = require('./types/type-resolvers');
const interfaceResolvers = require('./interfaces/interface-resolvers');

const {
  createTitle,
  createDescription,
} = require('../../../utils/content');

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

    // this one of like 4 parts needed to implement this
    // this defines the resolver for the 'metadata' element on the content interface
    // the element on the content interface returns an object whose type definition is in the content-definitions.js called 'ContnetMetaData'
    // and then there is the resolver for that type also here (below) as well
    //
    // so content-definitions.js (ContentMetaData type) used in interfaces/content.js as the 'metadata' element within the abstract content interface
    // both the 'metadata' element itself, AND the object type it returns, have resolvers in the content-resolvers.js file.
    metadata: content => content,
  },

  /**
   * Used in contnet interface
   * @jpdev - see why this is a summary repeat of other fields, do we really need it?
   */
  ContentMetadata: {
    title: (content, _, ctx) => createTitle(content, ctx),
    description: content => createDescription(content),
  },

  Query: {
    getContentExample: (parent, variables, context, info) => ResolverLogic.getContentExample(parent, variables, context, info),
    getContentStream: (parent, variables, context, info) => ResolverLogic.getContentStream(parent, variables, context, info),
  },
};

// module.exports = {
//   contentResolvers,
// };

/*
const contentResolvers = deepAssign(
  contentResolvers1,
  typeResolvers,
  interfaceResolvers,
);
module.exports = deepAssign(
  contentResolvers,
);
*/


module.exports = deepAssign(
  contentResolvers,
  typeResolvers,
  interfaceResolvers,
);

