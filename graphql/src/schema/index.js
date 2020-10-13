const { makeExecutableSchema } = require('graphql-tools');

const schemaDirectives = require('./directives');
const schemaDefinitions = require('./defintions');
const schemaResolvers = require('./resolvers');

module.exports = makeExecutableSchema({
  typeDefs: schemaDefinitions,
  resolvers: schemaResolvers,
  schemaDirectives,
});
