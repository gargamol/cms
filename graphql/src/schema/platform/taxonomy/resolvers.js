const { BaseDB } = require('../../../db');

const getProjection = require('../../../utils/get-projection');
const getGraphType = require('../../../utils/get-graph-type');

const loadHierarchy = async (taxonomy, load, projection, taxonomies = []) => {
  const ref = BaseDB.get(taxonomy, 'parent');
  const parentId = BaseDB.extractRefId(ref);
  if (!parentId) return taxonomies;
  const parent = await load('platformTaxonomy', parentId, projection, { status: 1 });
  if (!parent) return taxonomies;
  taxonomies.push(parent);
  return loadHierarchy(parent, load, projection, taxonomies);
};

// @jpdev - include resolverLogic.js or a just include in larger resolvers.js file??
class ResolverLogic {

  static async fullName(parent, variables, context, info) {
    const { fullName } = parent;
    const { input } = variables;
    const { suppressType, suppressId } = input;

    if (!fullName) return fullName;

    let name = fullName;
     if (suppressType) name = name.replace(/^[a-z]+?:\s/i, '');
     if (suppressId) name = name.replace(/\s\([0-9]+?\)$/i, '');
     return name;
  }

  static async hierarchy(parent, variables, context, info) {
    const taxonomy = parent;
    const { load } = context;
    const {
      returnType,
      fieldNodes,
      schema,
      fragments,
    } = info;

    const projection = getProjection(
      schema,
      getGraphType(returnType),
      fieldNodes[0].selectionSet,
      fragments,
    );
    projection.parent = 1;
    const thisTaxonomy = await load('platformTaxonomy', taxonomy._id, projection, { status: 1 });
    const taxonomies = await loadHierarchy(taxonomy, load, projection, [thisTaxonomy]);

    return taxonomies.reverse();

  }

}

const taxonomyResolvers = {

  // note: the keys on the left and the function names matching isn't required or used at all, just an organizational convention.  The keys DO have to line up with typeDefs they are resolving for however.
  Taxonomy: {
    fullName: (parent, variables, context, info) => ResolverLogic.fullName(parent, variables, context, info),
    hierarchy: (parent, variables, context, info) => ResolverLogic.hierarchy(parent, variables, context, info),
  },

};

module.exports = {
  taxonomyResolvers,
};

// module.exports = {
//   /**
//    *
//    */
//   Taxonomy: {
//     fullName: ({ fullName }, { input }) => {
//       const { suppressType, suppressId } = input;
//       if (!fullName) return fullName;
//       let name = fullName;
//       if (suppressType) name = name.replace(/^[a-z]+?:\s/i, '');
//       if (suppressId) name = name.replace(/\s\([0-9]+?\)$/i, '');
//       return name;
//     },

//     hierarchy: async (taxonomy, _, { load }, info) => {
//       const {
//         returnType,
//         fieldNodes,
//         schema,
//         fragments,
//       } = info;
//       const projection = getProjection(
//         schema,
//         getGraphType(returnType),
//         fieldNodes[0].selectionSet,
//         fragments,
//       );
//       projection.parent = 1;
//       const thisTaxonomy = await load('platformTaxonomy', taxonomy._id, projection, { status: 1 });
//       const taxonomies = await loadHierarchy(taxonomy, load, projection, [thisTaxonomy]);
//       return taxonomies.reverse();
//     },
//   },
// };

