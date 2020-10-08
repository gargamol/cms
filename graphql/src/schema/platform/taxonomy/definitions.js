const gql = require('graphql-tag');

module.exports = gql`

# extend type Query {
  
#   taxonomy(input: TaxonomyQueryInput!): Taxonomy
#     @findOne(
#       model: "platform.Taxonomy",
#       using: { id: "_id" },
#       criteria: "taxonomy",
#     )

#   taxonomies(input: TaxonomiesQueryInput = {}): TaxonomyConnection!
#     @findMany(
#       model: "platform.Taxonomy",
#       criteria: "taxonomy"
#       queryBuilder: "taxonomies",
#     )

#   taxonomiesOfType(input: TaxonomiesOfTypeQueryInput!): TaxonomyConnection!
#     @deprecated(reason: "Use \`Query.taxonomies\` with \`input.includeTypes = []\` instead.")
#     @findMany(
#       model: "platform.Taxonomy",
#       using: { type: "type" },
#     )

#   rootTaxonomies(input: RootTaxonomiesQueryInput = {}): TaxonomyConnection!
#     @deprecated(reason: "Use \`Query.taxonomies\` with \`input.rootOnly = true\` instead.")
#     @findMany(
#       model: "platform.Taxonomy",
#       criteria: "rootTaxonomies",
#     )

#   rootTaxonomiesOfType(input: RootTaxonomiesOfTypeQueryInput!): TaxonomyConnection!
#     @deprecated(reason: "Use \`Query.taxonomies\` with \`input.rootOnly = true\` and \`input.includeTypes = []\` instead.")
#     @findMany(
#       model: "platform.Taxonomy",
#       using: { type: "type" },
#       criteria: "rootTaxonomiesOfType",
#     )

#   matchTaxonomies(input: MatchTaxonomiesQueryInput!): TaxonomyConnection!
#     @matchMany(
#       model: "platform.Taxonomy",
#       criteria: "taxonomy",
#     )
# }

type Taxonomy {
  id: Int! @projection(localField: "_id") @value(localField: "_id")
  name: String @projection

  # @jpdev - I'd like to see how these input options on internal fields are used - this one allows you to supress id/type parts with bool flags
  # @jpdev - I get how its used as an input to a query/mutation definition, and I understand how you'd send them in, but how and where is the logic enforced in the code?
  # @jpdev - in this case there is a resolver, so 'input' values to supress whatever is parsed and used to alter that functionality, but I don't aways see a resolver (also done within directives?)
  fullName(input: TaxonomyFullNameInput = {}): String @projection

  description: String @projection
  type: String @projection
  status: Int @projection
  redirects: [String]! @projection @arrayValue
  sequence: Int @projection

  # @jpdev - like here, the input can be passed in, and refOne does consider it for adding status criteria, but only by name and checking input.status (which is one element of TaxonomyParentInput)
  parent(input: TaxonomyParentInput = {}): Taxonomy @projection @refOne(loader: "platformTaxonomy")
  # @jpdev - while refMany considers, makes use of, and passes along status, sort, and pagination, but again does that explicitly by each name.  Seems a slight disconnect in those directives and the input type defs could be an easy bug to create
  children(input: TaxonomyChildrenInput = {}): TaxonomyConnection! @projection(localField: "_id") @refMany(model: "platform.Taxonomy", localField: "_id", foreignField: "parent.$id")
  # however refMany allow allows you to include the using parameter of the directive call which will alternatively add ensure those input values are passed along to the critera
  # ie. "using: [field1, field2]"" in type def would mean that "{ field1 : input[field1] }"" is added to the criteria - seems like a better, cleaner solution overall to me

  urlName: String
    @projection(localField: "mutations.Website.urlName")
    @value(localField: "mutations.Website.urlName")
  urlPath: String
    @projection(localField: "mutations.Website.urlPath")
    @value(localField: "mutations.Website.urlPath")

  # GraphQL-only fields.
  # Retrieves the flattened (parent) hierarchy for this taxonomy.
  hierarchy: [Taxonomy!]! @projection(localField: "parent")
}

type TaxonomyConnection @projectUsing(type: "Taxonomy") {
  totalCount: Int!
  edges: [TaxonomyEdge]!
  pageInfo: PageInfo!
}

type TaxonomyEdge {
  node: Taxonomy!
  cursor: String!
}

enum TaxonomyType {
  Award
  Badge
  Bin
  Category
  Industry
  Location
  Market
  Organization
  Person
  PlatformChannel
  Region
  System
  Tag
  Topic
  Type
}

enum TaxonomySortField {
  id
  name
  fullName
  sequence
}

# enum TaxonomyMatchField {
#   name
#   fullName
# }

input TaxonomyFullNameInput {
  suppressType: Boolean = false
  suppressId: Boolean = false
}

input TaxonomySortInput {
  field: TaxonomySortField = id
  order: SortOrder = desc
}

input TaxonomyParentInput {
  status: ModelStatus = active
}

input TaxonomyChildrenInput {
  status: ModelStatus = active
  sort: TaxonomySortInput = {}
  pagination: PaginationInput = {}
}


# input TaxonomyQueryInput {
#   status: ModelStatus = active
#   id: Int!
# }

# input TaxonomiesQueryInput {
#   includeIds: [Int!] = []
#   excludeIds: [Int!] = []
#   includeTypes: [TaxonomyType!] = []
#   excludeTypes: [TaxonomyType!] = []
#   rootOnly: Boolean = false
#   status: ModelStatus = active
#   sort: TaxonomySortInput = {}
#   pagination: PaginationInput = {}
# }

# input MatchTaxonomiesQueryInput {
#   status: ModelStatus = active
#   pagination: PaginationInput = {}
#   sort: TaxonomySortInput = { order: asc }
#   field: TaxonomyMatchField!
#   phrase: String!
#   position: MatchPosition = contains
#   match: MatchWords = all
#   excludeIds: [Int!] = []
# }

# input TaxonomiesOfTypeQueryInput {
#   type: TaxonomyType!
#   status: ModelStatus = active
#   sort: TaxonomySortInput = {}
#   pagination: PaginationInput = {}
# }

# input RootTaxonomiesQueryInput {
#   status: ModelStatus = active
#   sort: TaxonomySortInput = {}
#   pagination: PaginationInput = {}
# }

# input RootTaxonomiesOfTypeQueryInput {
#   type: TaxonomyType!
#   status: ModelStatus = active
#   sort: TaxonomySortInput = {}
#   pagination: PaginationInput = {}
# }


`;

