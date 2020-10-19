//const gql = require('graphql-tag');
const { gql } = require('apollo-server');

const apparatus = require('./apparatus/definitions');
const article = require('./article/article-definitions');
const blog = require('./blog/definitions');
const collection = require('./collection/definitions');
const company = require('./company/definitions');
const contact = require('./contact/definitions');
const document = require('./document/definitions');
const ebook = require('./ebook/definitions');
const engineSpec = require('./engine-spec/definitions');
const event = require('./event/definitions');
const group = require('./group/definitions');
const inQuarters = require('./in-quarters/definitions');
const infographic = require('./infographic/definitions');
const job = require('./job/definitions');
const mediaGallery = require('./media-gallery/definitions');
const news = require('./news/definitions');
const page = require('./page/definitions');
const podcast = require('./podcast/definitions');
const pressRelease = require('./press-release/definitions');
const product = require('./product/definitions');
const promotion = require('./promotion/definitions');
const review = require('./review/definitions');
const space = require('./space/definitions');
const sponsored = require('./sponsored/definitions');
const supplier = require('./supplier/definitions');
const textAd = require('./text-ad/definitions');
const top100 = require('./top-100/definitions');
const topList = require('./top-list/definitions');
const venue = require('./venue/definitions');
const video = require('./video/definitions');
const webinar = require('./webinar/definitions');
const whitepaper = require('./whitepaper/definitions');

module.exports = gql`
  ${apparatus}
  ${article}
  ${blog}
  ${collection}
  ${company}
  ${contact}
  ${document}
  ${ebook}
  ${engineSpec}
  ${event}
  ${group}
  ${inQuarters}
  ${infographic}
  ${job}
  ${mediaGallery}
  ${news}
  ${page}
  ${podcast}
  ${pressRelease}
  ${product}
  ${promotion}
  ${review}
  ${space}
  ${sponsored}
  ${supplier}
  ${textAd}
  ${top100}
  ${topList}
  ${venue}
  ${video}
  ${webinar}
  ${whitepaper}
`;

