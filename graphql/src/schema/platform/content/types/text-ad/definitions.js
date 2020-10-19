const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  getTextAd(input: ContentTextAdQueryInput!): ContentTextAd 
    @findOne(
      model: "platform.Content", 
      using: { id: "_id" }, 
      criteria: "contentTextAd"
    )
}

type ContentTextAd implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\TextAd
  linkText: String @projection
  linkUrl: String @projection
}

type ContentTextAdConnection {
  totalCount: Int!
  edges: [ContentTextAdEdge]!
  pageInfo: PageInfo!
}

type ContentTextAdEdge {
  node: ContentTextAd!
  cursor: String!
}

input ContentTextAdQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentTextAdSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
