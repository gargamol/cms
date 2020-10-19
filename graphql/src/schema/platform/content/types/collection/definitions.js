const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  getCollection(input: ContentCollectionQueryInput!): ContentCollection @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCollection")
}

type ContentCollection implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Collection
  displayContentType: String @projection
  collection(input: ContentCollectionCollectionInput = {}): ContentCollectionConnection! @projection @refMany(model: "platform.Content", criteria: "contentCollection")
}

type ContentCollectionConnection {
  totalCount: Int!
  edges: [ContentCollectionEdge]!
  pageInfo: PageInfo!
}

type ContentCollectionEdge {
  node: ContentCollection!
  cursor: String!
}

input ContentCollectionQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentCollectionCollectionInput {
  status: ModelStatus = active
  sort: ContentCollectionSortInput = {}
  pagination: PaginationInput = {}
}

input ContentCollectionSortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

`;
