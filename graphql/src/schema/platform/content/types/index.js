//const gql = require('graphql-tag');
const { gql } = require('apollo-server');

const article = require('./article');
const company = require('./company');

module.exports = gql`
  ${article}
  ${company}
`;
