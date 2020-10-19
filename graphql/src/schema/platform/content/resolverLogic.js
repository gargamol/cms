const getPublishedCriteria = require('../../../utils/get-published-content-criteria.js');
const getWebsiteSectionDecendantIds = require('../../../utils/get-website-section-decendant-ids.js');
const connectionProjection = require('../../../utils/connection-projection.js');

class ResolverLogic {

  static async getContentExample(parent, variables, context, info) {

    const { input } = variables;
    const { basedb } = context;

    // Retrieve the content document.
    const contentId = input.id;
    const doc = await basedb.findById('platform.Content', contentId, {});

    // just return the document - we often modeled graph typeDef from existing mongo structure.  
    // Since they line up 1-to-1, can just return object without reformatting
    return doc;
  }


  /**
    *
   */
  static async getContentStream(parent, variables, context, info) {

    const { input } = variables;
    const { basedb, site } = context;

    const {
      since,
      after,
      sectionId,
      includeContentTypes,
      excludeContentTypes,
      excludeContentIds,
      requiresImage,
      sectionBubbling,
      sort,
      pagination,
      beginning,
      ending,
    } = input;

    // @jpdev - did I change this?  Do we only articles if no type explictily asked for?  Or should we be pulling default (all) types?
    const contentTypes = includeContentTypes.length ? includeContentTypes : ['Article'];

    const query = getPublishedCriteria({
      since,
      after,
      contentTypes,
      excludeContentIds,
      excludeContentTypes,
    });

    const siteId = input.siteId || site.id();
    if (siteId) query['mutations.Website.primarySite'] = siteId;

    if (beginning.before) query.$and.push({ startDate: { $lte: beginning.before } });
    if (beginning.after) query.$and.push({ startDate: { $gte: beginning.after } });
    if (ending.before) query.$and.push({ endDate: { $lte: ending.before } });
    if (ending.after) query.$and.push({ endDate: { $gte: ending.after } });

    if (requiresImage) {
      query.primaryImage = { $exists: true };
    }

    let sectionIds = sectionId;
    if (sectionId && sectionBubbling) {
      const descendantIds = await getWebsiteSectionDecendantIds(sectionId, basedb);
      if (descendantIds.length) {
        sectionIds = { $in: descendantIds };
      }
    }

    if (sectionIds) {
      query['mutations.Website.primarySection.$id'] = sectionIds;
    }

    const projection = connectionProjection(info);
    return basedb.paginate('platform.Content', {
      query,
      sort,
      projection,
      ...pagination,
    });
  }
}

module.exports = {
  ResolverLogic,
};
