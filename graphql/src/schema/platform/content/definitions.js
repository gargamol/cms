const { gql } = require('apollo-server');

// Content is abstract with 'type' discriminator, so start with common structure interface
//const contentInterface = require('./interfaces/content');
const contentInterfaces = require('./interfaces');

// Include all of the discriminated types with their specific definitions
const contentTypeDefintions = require('./types/definitions');

const contentDefinitions = gql`

  # Query endpoint defintions
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  extend type Query {

    # @jpdev - leaving example with resolver to demonstrate simple directiveless implementation
    getContentExample(input: ContentQueryInput = {}): Content

    getContent(input: ContentQueryInput = {}): Content
    @findOne(
      model: "platform.Content"
      using: { id: "_id" }
      criteria: "content"
      queryBuilder: "publishedContent"
      withSite: false # allow content to always load, regardless of site context.
    )

    # @jpdev - would prefer to rename this - pretty broad application with input, I think its 'published' because its not auth required so wouldn't want to make 'public' draft, deleted, future content with it
    # @jpdev - should rename all input types along with it for consistency.  Leaving alone until I decide what to do with it
    getContentStream(input: AllPublishedContentQueryInput = {}): ContentConnection!
    
  }
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------


  # (query) variable input format and their subcomponent formats
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  input ContentQueryInput {
    siteId: ObjectID
    id: Int!
    status: ModelStatus = active
    since: Date
  }

  input AllPublishedContentQueryInput {
    siteId: ObjectID
    after: Date
    since: Date
    sectionId: Int
    # @deprecated. Use \`AllPublishedContentQueryInput.includeContentTypes\` instead.
    #contentTypes: [ContentType!] = []
    includeContentTypes: [ContentType!] = []
    excludeContentTypes: [ContentType!] = []
    excludeContentIds: [Int!] = []
    requiresImage: Boolean = false
    sectionBubbling: Boolean = true
    sort: ContentSortInput = { field: published, order: desc }
    pagination: PaginationInput = {}
    beginning: ContentBeginningInput = {}
    ending: ContentEndingInput = {}
  }

  input ContentSortInput {
    field: ContentSortField = id
    order: SortOrder = desc
  }

  input ContentBeginningInput {
    before: Date
    after: Date
  }

  input ContentEndingInput {
    before: Date
    after: Date
  }

  input ContentTypeInput {
    format: ContentTypeFormat = dasherize
  }

  input ContentMutationInput {
    mutation: ContentMutation = Website
  }

  input ContentTeaserInput {
    mutation: ContentMutation = Website
    useFallback: Boolean = true
    minLength: Int = 75
    maxLength: Int = 125
    truncatedSuffix: String = "..."
  }

  input ContentBodyInput {
    mutation: ContentMutation = Website
  }

  input ContentImagesInput {
    sort: AssetImageSortInput = { order: values }
    pagination: PaginationInput = {}
  }

  # input ContentRelatedContentInput {
  #   siteId: ObjectID
  #   excludeContentTypes: [ContentType!] = []
  #   includeContentTypes: [ContentType!] = []
  #   requiresImage: Boolean = false
  #   queryTypes: [RelatedContentQueryType!] = [owned, inverse]
  #   pagination: PaginationInput = {}
  # }

  input ContentTaxonomyInput {
    status: ModelStatus = active
    type: TaxonomyType
    sort: TaxonomySortInput = {}
    pagination: PaginationInput = {}
  }

  input ContentExternalLinksInput {
    keys: [String]
  }

  input ContentCompanyInput {
    status: ModelStatus = active
  }

  input ContentRelatedToInput {
    status: ModelStatus = active
    sort: ContentSortInput = {}
    pagination: PaginationInput = {}
  }
  
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  type ContentConnection @projectUsing(type: "Content") {
    totalCount: Int!
    edges: [ContentEdge]!
    pageInfo: PageInfo!
  }

  type ContentEdge {
    node: Content!
    cursor: String!
  }

  type ContentGating {
    requiredRole: GateableUserRole
    surveyType: GateableSurveyProvider
    surveyId: String
  }

  # Used withing Addressable interface
  type ContentStubLocation {
    latitude: Float
    longitude: Float
  }

  enum GateableUserRole {
    ROLE_REGISTERED
  }

  enum GateableSurveyProvider {
    wufoo
    idme
    app_form_com
    idx
  }
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  # elements which have a set list of availabe values (specific to content in this file)
  enum ContentTypeFormat {
    standard
    dasherize
    underscore
    titleize
  }

  # NOTE: these fields must be properly indexed (with the correct collation)
  # otherwise sorted queries will be **slow** (5ms vs 500ms slow).
  # Generally speaking the index for each field would be:
  # createIndex({ [field]: 1, _id: 1 }, { collation: { locale: 'en_US } })
  enum ContentSortField {
    id
    name
    created
    updated
    published
    startDate
    endDate
  }

  enum ContentMutation {
    Email
    Magazine
    Website
  }

  enum RelatedContentQueryType {
    # returns related content from doc.relatedTo
    owned
    # returns related content on the inverse of doc.relatedTo
    inverse
    # returns related content based on primary section
    primarySection
    # returns related content based on inverse company and relatedTo
    company
  }
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------



  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  # Include main Content Interface for the abstract level common defintions, and the various addOn interfaces that get plugged into various extended content types (contactable interface to company type, etc)
  ${contentInterfaces}
  # Include the type specific implementations of each content type from the types subdirectory
  ${contentTypeDefintions}
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

`;

module.exports = {
  contentDefinitions,
};













// const gql = require('graphql-tag');
// const interfaces = require('./interfaces');
// const types = require('./types');

// module.exports = gql`

// extend type Query {
//   content(input: ContentQueryInput = {}): Content @findOne(
//     model: "platform.Content",
//     using: { id: "_id" },
//     criteria: "content",
//     queryBuilder: "publishedContent",
//     withSite: false, # allow content to always load, regardless of site context.
//   )
//   # load content from custom alias
//   contentAlias(input: ContentAliasQueryInput = {}): Content @findOne(
//     model: "platform.Content",
//     using: { alias: "mutations.Website.alias" },
//     criteria: "content",
//     queryBuilder: "publishedContent",
//     withSite: false, # allow content to always load, regardless of site context.
//   )
//   contentHash(input: ContentHashQueryInput = {}): Content @findOne(
//     model: "platform.Content",
//     using: { hash: "hash" },
//     criteria: "content",
//     withSite: false, # allow content to always load, regardless of site context.
//   )
//   allContent(input: AllContentQueryInput = {}): ContentConnection! @findMany(
//     model: "platform.Content",
//     criteria: "content",
//     queryBuilder: "allContent",
//     withSite: false, # allow content to always load, regardless of site context.
//   )
//   allPublishedContent(input: AllPublishedContentQueryInput = {}): ContentConnection!
//   publishedContentCounts(input: PublishedContentCountsQueryInput = {}): [PublishedContentCount!]!
//   contentSitemapUrls(input: ContentSitemapUrlsQueryInput = {}): [ContentSitemapUrl!]!
//   contentSitemapNewsUrls(input: ContentSitemapNewsUrlsQueryInput = {}): [ContentSitemapNewsUrl!]!
//   allAuthorContent(input: AllAuthorContentQueryInput = {}): ContentConnection!
//   allCompanyContent(input: AllCompanyContentQueryInput = {}): ContentConnection!
//   magazineScheduledContent(input: MagazineScheduledContentQueryInput = {}): ContentConnection!
//   websiteScheduledContent(input: WebsiteScheduledContentQueryInput = {}): WebsiteScheduledContentConnection!
//   newsletterScheduledContent(input: NewsletterScheduledContentQueryInput = {}): [Content!]!
//   relatedPublishedContent(input: RelatedPublishedContentQueryInput = {}): ContentConnection!
//   websiteExpiringContent(input: WebsiteExpiringContentQueryInput = {}): ContentConnection!
// }

// enum ContentMutation {
//   Email
//   Magazine
//   Website
// }

// enum ContentType {
//   Apparatus
//   Article
//   Blog
//   Collection
//   Company
//   Contact
//   Document
//   Ebook
//   EngineSpec
//   Event
//   Group
//   InQuarters
//   Infographic
//   Job
//   MediaGallery
//   News
//   Page
//   Podcast
//   PressRelease
//   Product
//   Promotion
//   Review
//   Space
//   Sponsored
//   Supplier
//   TextAd
//   Top100
//   TopList
//   Video
//   Venue
//   Webinar
//   Whitepaper
// }

// enum ContentTypeFormat {
//   standard
//   dasherize
//   underscore
//   titleize
// }

// # NOTE: these fields must be properly indexed (with the correct collation)
// # otherwise sorted queries will be **slow** (5ms vs 500ms slow).
// # Generally speaking the index for each field would be:
// # createIndex({ [field]: 1, _id: 1 }, { collation: { locale: 'en_US } })
// enum ContentSortField {
//   id
//   name
//   created
//   updated
//   published
//   startDate
//   endDate
// }

// enum ContentPathField {
//   id
//   type
//   slug
//   sectionAlias
// }

// enum ContentAuthorType {
//   author
//   contributor
//   photographer
// }

// enum RelatedContentQueryType {
//   # returns related content from doc.relatedTo
//   owned
//   # returns related content on the inverse of doc.relatedTo
//   inverse
//   # returns related content based on primary section
//   primarySection
//   # returns related content based on inverse company and relatedTo
//   company
// }

// type ContentUserRegistration {
//   isRequired: Boolean!
//   accessLevels: [String]!
// }

// type ContentConnection @projectUsing(type: "Content") {
//   totalCount: Int!
//   edges: [ContentEdge]!
//   pageInfo: PageInfo!
// }

// type WebsiteScheduledContentConnection @projectUsing(type: "Content") {
//   totalCount: Int!
//   edges: [ContentEdge]!
//   section: WebsiteSection @refOne(localField: "sectionId", loader: "websiteSection")
//   pageInfo: PageInfo!
// }

// type ContentEdge {
//   node: Content!
//   cursor: String!
// }

// # Note: any required projections must be set at the root "metadata" field
// type ContentMetadata {
//   title: String
//   description: String
//   publishedDate(input: FormatDate = {}): String @momentFormat(localField: "published")
//   updatedDate(input: FormatDate = {}): String @momentFormat(localField: "updated")
//   expiresDate(input: FormatDate = {}): String @momentFormat(localField: "unpublished")
//   image: AssetImage @refOne(localField: "primaryImage", loader: "platformAsset", criteria: "assetImage")
// }

// type ContentSiteContext {
//   url: String!
//   canonicalUrl: String!
//   path: String!
// }



// type ContentWebsiteSchedule {
//   section: WebsiteSection @refOne(loader: "websiteSection", localField: "sectionId")
//   option: WebsiteOption @refOne(loader: "websiteOption", localField: "optionId")
//   start: Date
//   startDate(input: FormatDate = {}): String @momentFormat(localField: "start")
//   end: Date
//   endDate(input: FormatDate = {}): String @momentFormat(localField: "end")
// }

// type PublishedContentCount {
//   id: String! @value(localField: "_id")
//   type(input: ContentTypeInput = {}): String!
//   count: Int!
// }

// type ContentSitemapUrl {
//   id: String! @value(localField: "_id")
//   loc: String!
//   lastmod: Date @value(localField: "updated")
//   changefreq: SitemapChangeFreq!
//   priority: Float!
//   images: [ContentSitemapImage!]!
// }

// type ContentSitemapNewsUrl {
//   id: String! @value(localField: "_id")
//   loc: String!
//   title: String!
//   publication: ContentSitemapNewsPublication!
//   published: Date
//   images: [ContentSitemapImage!]!
// }

// type ContentSitemapNewsPublication {
//   id: ObjectID! @value(localField: "_id")
//   name: String!
//   language: String!
// }

// type ContentSitemapImage {
//   id: String @value(localField: "_id")
//   loc: String!
//   caption: String
//   title: String
// }

// input ContentQueryInput {
//   siteId: ObjectID
//   status: ModelStatus = active
//   id: Int!
//   since: Date
// }

// input ContentAliasQueryInput {
//   siteId: ObjectID
//   status: ModelStatus = active
//   alias: String!
//   since: Date
// }

// input ContentHashQueryInput {
//   siteId: ObjectID
//   status: ModelStatus = active
//   hash: String!
// }

// input ContentSiteContextInput {
//   "Determines whether to use the \`content.linkUrl\` field for generating paths and URLs. If \`false\`, the \`linkUrl\` will be ignored."
//   enableLinkUrl: Boolean = true
// }

// input ContentSitemapUrlsQueryInput {
//   siteId: ObjectID
//   since: Date
//   contentTypes: [ContentType!]!
//   changefreq: SitemapChangeFreq = weekly
//   priority: Float = 0.5
//   pagination: PaginationInput = { limit: 100 }
// }

// input ContentSitemapNewsUrlsQueryInput {
//   siteId: ObjectID
//   includeContentTypes: [ContentType!] = [News, PressRelease, Blog]
//   excludeContentTypes: [ContentType!] = []
//   taxonomyIds: [Int!] = []
// }

// input AllPublishedContentQueryInput {
//   siteId: ObjectID
//   after: Date
//   since: Date
//   sectionId: Int
//   # @deprecated. Use \`AllPublishedContentQueryInput.includeContentTypes\` instead.
//   contentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   excludeContentTypes: [ContentType!] = []
//   excludeContentIds: [Int!] = []
//   requiresImage: Boolean = false
//   sectionBubbling: Boolean = true
//   sort: ContentSortInput = { field: published, order: desc }
//   pagination: PaginationInput = {}
//   beginning: ContentBeginningInput = {}
//   ending: ContentEndingInput = {}
// }

// input PublishedContentCountsQueryInput {
//   siteId: ObjectID
//   after: Date
//   since: Date
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
// }

// input AllAuthorContentQueryInput {
//   siteId: ObjectID
//   contactId: Int!
//   since: Date
//   authorTypes: [ContentAuthorType!] = [author, contributor, photographer]
//   includeContentTypes: [ContentType!] = []
//   requiresImage: Boolean = false
//   sort: ContentSortInput = { field: published, order: desc }
//   pagination: PaginationInput = {}
//   withSite: Boolean = true
// }

// input AllCompanyContentQueryInput {
//   siteId: ObjectID
//   companyId: Int!
//   since: Date
//   includeContentTypes: [ContentType!] = []
//   excludeContentTypes: [ContentType!] = []
//   requiresImage: Boolean = false
//   sort: ContentSortInput = { field: published, order: desc }
//   pagination: PaginationInput = {}
//   withSite: Boolean = true
// }

// input ContentBeginningInput {
//   before: Date
//   after: Date
// }

// input ContentEndingInput {
//   before: Date
//   after: Date
// }

// input ContentCustomAttributeInput {
//   "The custom attribute field path."
//   path: String!
// }

// input AllContentQueryInput {
//   siteId: ObjectID
//   status: ModelStatus = active
//   "Content IDs to filter by. An empty value (default) returns all content."
//   ids: [Int!] = []
//   sort: ContentSortInput = {}
//   pagination: PaginationInput = {}
// }

// input MagazineScheduledContentQueryInput {
//   issueId: Int!
//   sectionId: Int
//   excludeContentIds: [Int!] = []
//   excludeSectionIds: [Int!] = []
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   requiresImage: Boolean = false
//   pagination: PaginationInput = {}
// }

// input WebsiteExpiringContentQueryInput {
//   siteId: ObjectID
//   before: Date
//   after: Date
//   sectionId: Int
//   optionId: [Int] = []
//   excludeContentIds: [Int!] = []
//   excludeSectionIds: [Int!] = []
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   pagination: PaginationInput = {}
// }

// input NewsletterScheduledContentQueryInput {
//   newsletterId: ObjectID!
//   sectionId: Int
//   sectionName: String
//   date: Date!
//   timezone: String
//   ignoreStartDate: Boolean = false
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   limit: Int
//   skip: Int
// }

// input WebsiteScheduledContentQueryInput {
//   siteId: ObjectID
//   sectionId: Int
//   sectionAlias: String
//   optionId: [Int] = []
//   optionName: [String] = []
//   excludeContentIds: [Int!] = []
//   excludeSectionIds: [Int!] = []
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   requiresImage: Boolean = false
//   useOptionFallback: Boolean = false
//   sectionBubbling: Boolean = true
//   pagination: PaginationInput = {}
//   sort: ContentSortInput = { field: null }
// }

// input RelatedPublishedContentQueryInput {
//   siteId: ObjectID
//   contentId: Int!
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   requiresImage: Boolean = false
//   queryTypes: [RelatedContentQueryType!] = [owned, inverse]
//   pagination: PaginationInput = {}
// }

// input ContentRelatedContentInput {
//   siteId: ObjectID
//   excludeContentTypes: [ContentType!] = []
//   includeContentTypes: [ContentType!] = []
//   requiresImage: Boolean = false
//   queryTypes: [RelatedContentQueryType!] = [owned, inverse]
//   pagination: PaginationInput = {}
// }

// input ContentMutationInput {
//   mutation: ContentMutation = Website
// }

// input ContentTeaserInput {
//   mutation: ContentMutation = Website
//   useFallback: Boolean = true
//   minLength: Int = 75
//   maxLength: Int = 125
//   truncatedSuffix: String = "..."
// }

// input ContentBodyInput {
//   mutation: ContentMutation = Website
// }

// input ContentTaxonomyInput {
//   status: ModelStatus = active
//   type: TaxonomyType
//   sort: TaxonomySortInput = {}
//   pagination: PaginationInput = {}
// }

// input ContentImagesInput {
//   sort: AssetImageSortInput = { order: values }
//   pagination: PaginationInput = {}
// }

// input ContentPrimarySiteInput {
//   status: ModelStatus = active
// }

// input ContentPrimarySectionInput {
//   siteId: ObjectID
//   status: ModelStatus = active
// }

// input ContentTypeInput {
//   format: ContentTypeFormat = dasherize
// }

// input ContentSortInput {
//   field: ContentSortField = id
//   order: SortOrder = desc
// }

// input ContentHasWebsiteScheduleInput {
//   siteId: ObjectID
//   sectionId: Int
//   sectionAlias: String
//   optionId: [Int] = []
//   optionName: [String] = []
//   sectionBubbling: Boolean = true
// }
