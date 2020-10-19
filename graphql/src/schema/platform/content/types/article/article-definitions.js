const gql = require("graphql-tag");

module.exports = gql`

  extend type Query {
    getArticle(input: ContentArticleQueryInput!): ContentArticle
    @findOne(
      model: "platform.Content"
      using: { id: "_id" }
      criteria: "contentArticle"
    )
  }

  #type ContentArticle implements Content & Authorable @applyInterfaceFields {
  type ContentArticle implements Content @applyInterfaceFields {
    # fields directly on platform.model::ContentArticle
    sidebars: [String]!
  }

  # @jpdev - confirm we need this and how they are used - enabable running down another issue and working now, but haven't some across actual use
  # @jpdev - I'd like to rename all of the *Connection types to *Stream - better description to me, but low priority
  type ContentArticleConnection {
    totalCount: Int!
    edges: [ContentArticleEdge]!
    pageInfo: PageInfo!
  }

  type ContentArticleEdge {
    node: ContentArticle!
    cursor: String!
  }

  input ContentArticleQueryInput {
    id: Int!
    status: ModelStatus = active
  }

  input ContentArticleSortInput {
    field: ContentSortField = id
    order: SortOrder = desc
  }
`;
