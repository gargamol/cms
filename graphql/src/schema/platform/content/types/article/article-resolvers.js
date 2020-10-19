const { articleResolverLogic } = require('./article-resolver-logic');

module.exports = {

  ContentArticle: {
    sidebars: (parent, variables, context, info) => articleResolverLogic.sidebars(parent, variables, context, info),
  },

};
