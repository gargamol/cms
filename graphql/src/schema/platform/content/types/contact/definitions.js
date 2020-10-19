// @jpdev @jpdisable - mutation stuff
const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  getContact(input: ContentContactQueryInput!): ContentContact @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentContact")
}

# extend type Mutation {
#   createContentContact(input: CreateContentContactMutationInput!): ContentContact! @requiresAuth
#   updateContentContact(input: UpdateContentContactMutationInput!): ContentContact! @requiresAuth
#   updateContentContactImages(input: UpdateContentContactImagesMutationInput!): ContentContact! @requiresAuth
# }

type ContentContact implements Content & Contactable & Addressable & SocialLinkable @applyInterfaceFields {
  # GraphQL-only fields
  # @todo Implement
  # @jpdev - so does this not work?
  # @see Cygnus\ApplicationBundle\Icarus\BlockHandler\ContentAuthorQuery
  ownedContent(input: ContentContactOwnedContentInput = {}): ContentConnection!
}

type ContentContactConnection {
  totalCount: Int!
  edges: [ContentContactEdge]!
  pageInfo: PageInfo!
}

type ContentContactEdge {
  node: ContentContact!
  cursor: String!
}

enum ContentContactAuthorType {
  author
  contributor
  photographer
}

enum ContentContactSortField {
  id
  name
  lastName
  firstName
  created
  updated
  published
}

input ContentContactQueryInput {
  id: Int!
  status: ModelStatus = active
}

# @todo Implement.
input ContentContactOwnedContentInput {
  type: ContentContactAuthorType # a null value means all types
  excludeContentTypes: [ContentType]! = []
  includeContentTypes: [ContentType]! = []
  requiresImage: Boolean = false
  sort: ContentSortInput = {}
  pagination: PaginationInput = {}
}

input ContentContactSortInput {
  field: ContentContactSortField = id
  order: SortOrder = desc
}

# input CreateContentContactMutationInput {
#   payload: CreateContentContactPayloadMutationInput = {}
# }

# input CreateContentContactPayloadMutationInput {
#   firstName: String
#   lastName: String
#   title: String
#   status: Int = 2
#   primarySectionId: Int!
# }

# input UpdateContentContactMutationInput {
#   id: Int!
#   payload: UpdateContentContactPayloadMutationInput = {}
# }

# input UpdateContentContactPayloadMutationInput {
#   firstName: String
#   lastName: String
#   title: String
#   status: Int
# }

# input UpdateContentContactImagesMutationInput {
#   id: Int!
#   payload: UpdateContentContactImagesPayloadMutationInput = {}
# }

# input UpdateContentContactImagesPayloadMutationInput {
#   primaryImageId: ObjectID
#   imageIds: [ObjectID!]
# }

`;

