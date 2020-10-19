//const gql = require('graphql-tag');
const { gql } = require('apollo-server');

const apparatus = require('./apparatus/definitions');
const article = require('./article/definitions');
const blog = require('./blog/definitions');
const collection = require('./collection/definitions');
const company = require('./company/definitions');
const contact = require('./contact/definitions');
const document = require('./document/definitions');
const ebook = require('./ebook/definitions');
const enginespec = require('./engine-spec/definitions');
const event = require('./event/definitions');
const group = require('./group/definitions');
const inquarters = require('./in-quarters/definitions');

const product = require('./product/definitions');

module.exports = gql`
  ${apparatus}
  ${article}
  ${blog}
  ${collection}
  ${company}
  ${contact}
  ${document}
  ${ebook}
  ${enginespec}
  ${event}
  ${inquarters}
  ${group}

  ${product}
`;
