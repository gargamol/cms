// @jpdev @jpdisable - used to get at the getPublishedContentCriteria helper method allowed as an option within query-builders/published-content (perhaps it should be moved there)
// @jpdev - much else in this file alrady commented out with @todo notes indicating this was either old/bad code or being rewritten, I'm commenting out the rest until I see a need/use to justify it

const { BaseDB } = require('../db');

// ----------------------------------------------------------------------------------------
// @jpdev - this is why they often used an index.js within folders that included all the individual function files - 
// @jpdev - smaller use everywhere else, require/dereference off that wrapper instead of having a dozen require lines all over the place.  Worth it or more confusing?
// const {
//   isObject,
//   getPublishedContentCriteria: getPublishedCriteria,
//   getDefaultContentTypes,
// } = require('@base-cms/utils');

//const isOjbect = require('./is-object');
const getPublishedCriteria = require('./get-published-content-criteria');
//const getDefaultContentTypes = require('./get-default-content-types');
// ----------------------------------------------------------------------------------------

//const { stripTags } = require('./html');
//const criteriaFor = require('./criteria-for');

// const createSeoTitle = (doc) => {
//   let title = BaseDB.extractMutationValue(doc, 'Website', 'seoTitle');
//   if (!title) title = BaseDB.fillMutation(doc, 'Website', 'name');
//   return stripTags(title || '').trim();
// };


// const createTitleCompany = async (doc, { load }) => {
//   const id = BaseDB.extractRefId(doc.company);
//   if (!id) return null;
//   const company = await load('platformContent', id, {
//     name: 1,
//     'mutations.Website.seoTitle': 1,
//     'mutations.Website.name': 1,
//   }, { status: 1, ...criteriaFor('contentCompany') });
//   if (!company) return null;
//   const title = createSeoTitle(company);
//   if (title) return `From: ${title}`;
//   return null;
// };

// // const createTitlePrimarySection = async (doc, load) => {
// //   const ref = BaseDB.extractMutationValue(doc, 'Website', 'primarySection');
// //   const id = BaseDB.extractRefId(ref);
// //   if (!id) return null;
// //   const section = await
// //     load('websiteSection', id, { seoTitle: 1, fullName: 1, name: 1 }, { status: 1 });
// //   if (!section) return null;
// //   if (section.seoTitle) return section.seoTitle;
// //   if (section.fullName) return section.fullName;
// //   return section.name;
// // };

// const createTitle = async (doc, ctx) => {
//   if (!isObject(doc)) return null;
//   const title = createSeoTitle(doc);
//   if (doc.type !== 'Product') return title;
//   const companyTitle = await createTitleCompany(doc, ctx);
//   if (companyTitle) return `${title} ${companyTitle}`;
//   return title;
//   // The below has been removed.
//   // This should NOT be handled on read and, instead, should be done at write time.
//   // @todo Add support for this on write in platform.

//   // if (!title) return null;
//   // if (type !== 'Product') return title;
//   // const [sectionTitle, companyTitle] = await Promise.all([
//   //   createTitlePrimarySection(doc, load),
//   //   createTitleCompany(doc, load),
//   // ]);
//   // if (sectionTitle) title = `${title} in ${sectionTitle}`;
//   // if (companyTitle) title = `${companyTitle} ${title}`;

//   // return title;
// };

// const createDescription = (doc) => {
//   if (!isObject(doc)) return null;
//   const description = stripTags((BaseDB.fillMutation(doc, 'Website', 'teaser') || '').trim());
//   return description;
//   // This should not require the entire body, and rather should be handled at save time.
//   // Otherwise, the entire body needs to be returned all the time.
//   // No longer doing this here.
//   // @todo Add support for this on write in platform.

//   // const body = stripTags(BaseDB.fillMutation(doc, 'Website', 'body') || '');
//   // return `${body.substring(0, 155)}...`;
// };

module.exports = {
  //createTitle,
  //createDescription,
  getPublishedCriteria,
  //getDefaultContentTypes,
};
