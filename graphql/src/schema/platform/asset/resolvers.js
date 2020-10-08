const defaults = require('../../../defaults');

//const { createAltFor, createSrcFor, createCaptionFor } = require('@base-cms/image');
// @jpdev - image ends up needed inflector, which ends up needing html - really starting to reconsider the whole 'packages' idea
// can reproduce code in each file but can't tell if its used a million places down the line and will need to be extracted out again
const { createAltFor, createSrcFor, createCaptionFor } = require('../../../utils/image');

// @jpdev - include resolverLogic.js or a just include in larger resolvers.js file??
class ResolverLogic {
  // @jpdev - 'parent' is 'image' in this case
  static async src(image, { input }, context, info) {
    // Use site image host otherwise fallback to global default.
    const imageHost = context.site.get('imageHost', defaults.imageHost);
    return createSrcFor(imageHost, image, input.options, { w: 320, auto: 'format' });
  }

  static async alt(image, { input }, context, info) {
    return createAltFor(image);
  }

  static async caption(image, { input }, context, info) {
    return createCaptionFor(image.caption);
  }

}

const assetResolvers = {

  AssetImage: {
    src: (parent, variables, context, info) => ResolverLogic.src(parent, variables, context, info),
    alt: (parent, variables, context, info) => ResolverLogic.alt(parent, variables, context, info),
    caption: (parent, variables, context, info) => ResolverLogic.caption(parent, variables, context, info),
  },

};

module.exports = {
  assetResolvers,
};
