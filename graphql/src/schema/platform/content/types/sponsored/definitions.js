const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  getSponsored(input: ContentSponsoredQueryInput!): ContentSponsored 
    @findOne(model: "platform.Content", 
    using: { id: "_id" }, 
    criteria: "contentSponsored"
  )
}

type ContentSponsored implements Content & Authorable @applyInterfaceFields {
  id: Int! @projection @value(localField: "_id")
}

type ContentSponsoredConnection {
  totalCount: Int!
  edges: [ContentSponsoredEdge]!
  pageInfo: PageInfo!
}

type ContentSponsoredEdge {
  node: ContentSponsored!
  cursor: String!
}

input ContentSponsoredQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentSponsoredSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
