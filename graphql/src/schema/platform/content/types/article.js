const gql = require("graphql-tag");

module.exports = gql`

  extend type Query {
    getContentArticle(input: ContentArticleQueryInput!): ContentArticle
    @findOne(
      model: "platform.Content"
      using: { id: "_id" }
      criteria: "contentArticle"
    )
  }

  #type ContentArticle implements Content & Authorable @applyInterfaceFields {
  type ContentArticle implements Content @applyInterfaceFields {
    # fields directly on platform.model::ContentArticle
    #sidebars: [String]! @projection
    sidebars: [String]!
    #name: String
    #status: Int
    #type: String!
  }

  # @jpdev - confirm we need this and how they are used - enabable running down another issue and working now, but haven't some across actual use
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
