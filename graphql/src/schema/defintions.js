const gql = require('graphql-tag');

const platformDefintions = require('./platform/definitions');

module.exports = gql`

  ${platformDefintions}

  scalar Date
  scalar JSON
  scalar ObjectID

  # projectUsing needed for ClientConnection types, used to tell graph use Content.type to resolve interface to its implementation
  directive @projectUsing(type: String!) on OBJECT

  # applyInterfaceFields basically copies all fields defined on the interface onto implementations of that interface so you don't have to manage in both places
  directive @applyInterfaceFields on OBJECT

  # used for returning multiple versions of a field when it is mutatable so any can be requested to fill that return value aside from default
  # good example is name with mutations.Website.name/mutations.Email.name/mutations.Magazine.name
  # name(input: ContentMutationInput = {}): String @projection(localField: "name", needs: ["mutations.Website.name", "mutations.Email.name", "mutations.Magazine.name"]) @mutatedValue
  directive @mutatedValue(localField: String) on FIELD_DEFINITION

  # date formatting
  directive @momentFormat(localField: String) on FIELD_DEFINITION
  
  # insert purpose/use here
  directive @arrayValue(localField: String) on FIELD_DEFINITION

  # used in allPublishedContent
  directive @requiresProject(fields: [String] = []) on OBJECT | INTERFACE

  directive @projection(
    localField: String
    needs: [String] = []
  ) on FIELD_DEFINITION

  directive @value(
    localField: String
    fallbackField: String
  ) on FIELD_DEFINITION
  
  # refOne Directive will lookup/cache a referened object based on its reference id (simple or complex)
  directive @refOne(
    loader: String!
    localField: String
    withSite: Boolean = false
    siteField: String = "site.$id"
    criteria: String
  ) on FIELD_DEFINITION

  # refMany Directive will lookup/cache an array of references based on their reference id (simple or complex)
  directive @refMany(
    model: String! # The model name to query, e.g. platform.Content or website.Schedule.
    using: JSON # A query input-to-document map. The key represents the input and the value represents the doc field to apply the input value to.
    withSite: Boolean = false # When true, will apply the siteId context (if present) to the query.
    siteField: String = "site.$id" # The document field to apply the siteId to.
    criteria: String # A query criteria key. If present in utils/criteria-for.js, will apply the criteria found to the query.
    refQueryBuilder: String # A query builder key. If present in ref-query-builders/index.js, will invoke the function and return the modified query object.
    localField: String
    foreignField: String = "_id"
  ) on FIELD_DEFINITION

  # was in content defintions, used in their old "Content" endpoint to query an single item
  directive @findOne(
    model: String!
    using: JSON
    withSite: Boolean = false
    siteField: String = "site.$id"
    criteria: String
    queryBuilder: String
  ) on FIELD_DEFINITION
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------



  type Query {
    ping: String!
  }

  type Mutation {
    ping: String!
  }

  type PageInfo {
    hasNextPage: Boolean!
    endCursor: String
  }

  enum SortOrder {
    asc
    desc
    values
  }

  enum ModelStatus {
    any
    active
    draft
    deleted
  }

  enum MatchPosition {
    contains
    starts
    ends
    exact
  }

  enum MatchWords {
    any
    all
  }

  enum SitemapChangeFreq {
    always
    hourly
    daily
    weekly
    monthly
    yearly
    never
  }



  input PaginationInput {
    limit: Int = 10
    skip: Int
    after: String
  }

  input FormatDate {
    format: String
    timezone: String
  }



  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  # @jpdev - these were in content defintions but noted as found in more general - not sure if they are root or platform, so leaving separate here for now but defined in this file at least

  enum ContentType {
    Apparatus
    Article
    Blog
    Collection
    Company
    Contact
    Document
    Ebook
    EngineSpec
    Event
    Group
    InQuarters
    Infographic
    Job
    MediaGallery
    News
    Page
    Podcast
    PressRelease
    Product
    Promotion
    Review
    Space
    Sponsored
    Supplier
    TextAd
    Top100
    TopList
    Video
    Venue
    Webinar
    Whitepaper
  }
  # --------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  

`;
