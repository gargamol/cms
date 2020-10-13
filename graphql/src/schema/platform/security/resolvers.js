class ResolverLogic {
  static async name({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
}

const securityResolvers = {
  User: {
    name: (parent, variables, context, info) => ResolverLogic.name(parent),
  },
};

module.exports = {
  securityResolvers,
};

// module.exports = {
//   /**
//    *
//    */
//   User: {
//     name: ({ firstName, lastName }) => `${firstName} ${lastName}`,
//   },
// };
