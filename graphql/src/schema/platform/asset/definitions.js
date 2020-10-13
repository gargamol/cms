const gql = require('graphql-tag');

module.exports = gql`

# @jpdisable
# extend type Query {
#   assetImage(input: AssetImageQueryInput!): AssetImage @findOne(model: "platform.Asset", using: { id: "_id" }, criteria: "assetImage")
# }

# extend type Mutation {
#   updateAssetImage(input: UpdateAssetImageMutationInput!): AssetImage! @requiresAuth
#   createAssetImageFromUrl(input: CreateAssetImageFromUrlMutationInput!): AssetImage! @requiresAuth
# }

type AssetImage {
  # from platform.model::Asset
  id: ObjectID! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection
  touched: Date @projection

  # from platform.model::Asset\Image
  filePath: String @projection
  fileName: String @projection
  source: AssetImageSource @projection
  displayName: String @projection
  caption: String @projection
  credit: String @projection
  cropDimensions: AssetImageCrop @projection
  isLogo: Boolean @projection
  body: String @projection

  # from platform.model::Asset\Image mutations
  approvedWebsite: Boolean @projection(localField: "mutations.Website.approved") @value(localField: "mutations.Website.approved")
  approvedMagazine: Boolean @projection(localField: "mutations.Magazine.approved") @value(localField: "mutations.Magazine.approved")

  # GraphQL specific fields
  # @jpdev - another odd one, why does src support in input?  Probably for a mutation that adds or updates an image, but why is that in graph?  future support, or legacy vestige?
  src(input: AssetImageSrcInput = {}): String! @projection(localField: "fileName", needs: ["filePath", "cropDimensions", "isLogo"])
  alt: String! @projection(localField: "name", needs: ["caption", "fileName"])
}

type AssetImageConnection @projectUsing(type: "AssetImage") {
  totalCount: Int!
  edges: [AssetImageEdge]!
  pageInfo: PageInfo!
}

type AssetImageEdge {
  node: AssetImage!
  cursor: String!
}

type AssetImageSource {
  location: String
  name: String
  width: Int
  height: Int
  processed: Boolean
}

type AssetImageCrop {
  x1: Int
  x2: Int
  y1: Int
  y2: Int
  aspectRatio: String
}

input AssetImageSortInput {
  field: AssetImageSortField = id
  order: SortOrder = desc
}

enum AssetImageSortField {
  id
  name
  touched
  filePath
  fileName
}

input AssetImageSrcInput {
  options: JSON
}

# @jpdisable
# input AssetImageQueryInput {
#   id: ObjectID!
# }

# input UpdateAssetImageMutationInput {
#   id: ObjectID!
#   payload: UpdateAssetImageMutationPayloadInput = {}
# }

# input UpdateAssetImageMutationPayloadInput {
#   name: String
#   filePath: String
#   fileName: String
#   isLogo: Boolean
# }

# input CreateAssetImageFromUrlMutationInput {
#   url: String!
# }

`;
