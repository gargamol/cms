//const gql = require('graphql-tag');
const { gql } = require('apollo-server');

const article = require('./article/definitions');
const company = require('./company/definitions');
const contact = require('./contact/definitions');

module.exports = gql`
  ${article}
  ${company}
  ${contact}
`;
