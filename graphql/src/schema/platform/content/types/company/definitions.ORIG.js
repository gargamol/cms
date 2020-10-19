const gql = require('graphql-tag');

module.exports = gql`

extend type Query {
  # @jpdev - do we prefer all one line, or with linebreaks for the directive?  (see ../article/article.js)
  getCompany(input: ContentCompanyQueryInput!): ContentCompany @findOne(model: "platform.Content", using: { id: "_id" }, criteria: "contentCompany")
}

# extend type Mutation {
#   updateContentCompany(input: UpdateContentCompanyMutationInput!): ContentCompany @requiresAuth
#   updateContentCompanyImages(input: UpdateContentCompanyImagesMutationInput!): ContentCompany @requiresAuth
#   updateContentCompanyExternalLinks(input: UpdateContentCompanyExternalLinksMutationInput!): ContentCompany @requiresAuth
#   updateContentCompanySocialLinks(input: UpdateContentCompanySocialLinksMutationInput!): ContentCompany @requiresAuth
#   updateContentCompanyYoutube(input: UpdateContentCompanyYoutubeMutationInput!): ContentCompany @requiresAuth
#   updateContentCompanyPublicContacts(input: UpdateContentCompanyPublicContactsMutationInput!): ContentCompany @requiresAuth
# }

#type ContentCompany implements Content & PrimaryCategory & Contactable & Addressable & SocialLinkable & Inquirable & OrganizationContactable @applyInterfaceFields {
type ContentCompany implements Content @applyInterfaceFields {
  # fields directly on platform.model::Content\Company
  companyType: String @projection
  parentCompany(input: ContentCompanyParentCompanyInput = {}): ContentCompany @projection @refOne(loader: "platformContent" criteria: "contentCompany")
  brandsCarried(input: ContentCompanyBrandsCarriedInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content" criteria: "contentCompany")
  statesServed: [String]! @projection @arrayValue
  companyCompetitors(input: ContentCompanyCompanyCompetitorsInput = {}): ContentCompanyConnection! @projection @refMany(model: "platform.Content", criteria: "contentCompany")

  numberOfEmployees: String @projection
  trainingInformation: String @projection
  yearsInOperation: String @projection
  salesRegion: String @projection
  servicesProvided: String @projection
  salesChannels: String @projection
  productSummary: String @projection
  serviceInformation: String @projection
  warrantyInformation: String @projection

  # @jpdev - is this used?
  youtube: ContentCompanyYoutube! @projection
  
  # @jpdev - @jpdisable - google-data-api
  # @jpdev - This uses definitions/resolvers outside of base entirely, hits google data api to get playlist data from a youtube channel, not sure if we use/support, sounds cool but disabling while doing platform for now
  #youtubeVideos(input: ContentCompanyYoutubeVideosInput = {}): YoutubePlaylistConnection! @projection(needs: ["youtube"])
  
   # @jpdev - is this used?
  externalLinks(input: ContentCompanyExternalLinksInput = {}): [EntityStubExternalLink]! @projection

  ## fields directly on platform.model::Content\Company from mutations
  featuredCategories(input: ContentCompanyFeaturedCategoriesInput = {}): TaxonomyConnection! @projection(localField: "mutations.Website.featuredCategories") @refMany(model: "platform.Taxonomy", localField: "mutations.Website.featuredCategories", criteria: "taxonomyCategory")
  }



type ContentCompanyConnection {
  totalCount: Int!
  edges: [ContentCompanyEdge]!
  pageInfo: PageInfo!
}

type ContentCompanyEdge {
  node: ContentCompany!
  cursor: String!
}

input ContentCompanyQueryInput {
  id: Int!
  status: ModelStatus = active
}

input ContentCompanyParentCompanyInput {
  status: ModelStatus = active
}

input ContentCompanyBrandsCarriedInput {
  status: ModelStatus = active
  sort: ContentCompanySortInput = {}
  pagination: PaginationInput = {}
}

input ContentCompanySortInput {
  field: ContentSortField = id
  order: SortOrder = desc
}

input ContentCompanyCompanyCompetitorsInput {
  status: ModelStatus = active
  sort: ContentCompanySortInput = {}
  pagination: PaginationInput = {}
}

# @jpdev - do we even use this?
type ContentCompanyYoutube {
  username: String
  channelId: String
  playlistId: String
  videos: [String!]
  url: String
}

# @jpdev - part of the google-data-api playlist listing thing I have disabled, so disabling this as well for now
# input ContentCompanyYoutubeVideosInput {
#   pagination: PaginationInput = {}
# }

# @jpdev - these are so closely named, do we really need both?
input ContentCompanyExternalLinkInput {
  key: String!
  url: String!
  label: String
}

input ContentCompanyExternalLinksInput {
  keys: [String]
}



input ContentCompanyFeaturedCategoriesInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}


# input UpdateContentCompanyMutationInput {
#   id: Int!
#   payload: UpdateContentCompanyPayloadMutationInput = {}
# }

# input UpdateContentCompanyPayloadMutationInput {
#   name: String
#   address1: String
#   address2: String
#   city: String
#   state: String
#   zip: String
#   country: String
#   phone: String
#   tollfree: String
#   fax: String
#   website: String
#   type: String
#   email: String
#   body: String
#   teaser: String
#   numberOfEmployees: String
#   trainingInformation: String
#   yearsInOperation: String
#   salesRegion: String
#   servicesProvided: String
#   salesChannels: String
#   productSummary: String
#   serviceInformation: String
#   warrantyInformation: String
# }

# input UpdateContentCompanyImagesMutationInput {
#   id: Int!
#   payload: UpdateContentCompanyImagesPayloadMutationInput = {}
# }

# input UpdateContentCompanyImagesPayloadMutationInput {
#   primaryImage: ObjectID
#   images: [ObjectID!]
# }

# input UpdateContentCompanyExternalLinksMutationInput {
#   id: Int!
#   payload: UpdateContentCompanyExternalLinksPayloadMutationInput = {}
# }

# input UpdateContentCompanyExternalLinksPayloadMutationInput {
#   externalLinks: [ContentCompanyExternalLinkInput!]!
# }

# input UpdateContentCompanySocialLinksMutationInput {
#   id: Int!
#   payload: UpdateContentCompanySocialLinksPayloadMutationInput = {}
# }

# input UpdateContentCompanySocialLinksPayloadMutationInput {
#   socialLinks: [ContentCompanySocialLinkInput!]!
# }

# input UpdateContentCompanyYoutubeMutationInput {
#   id: Int!
#   payload: UpdateContentCompanyYoutubePayloadMutationInput = {}
# }

# input UpdateContentCompanyYoutubePayloadMutationInput {
#   channelId: String
#   playlistId: String
#   username: String
# }



# input ContentCompanySocialLinkInput {
#   provider: String!
#   url: String!
# }













# input UpdateContentCompanyPublicContactsMutationInput {
#   id: Int!
#   payload: UpdateContentCompanyPublicContactsPayloadMutationInput = {}
# }

# input UpdateContentCompanyPublicContactsPayloadMutationInput {
#   contactIds: [Int!]!
# }

`;
