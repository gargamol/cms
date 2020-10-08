const gql = require('graphql-tag');

// @jpdev - these includes should be consistent - either export object, or export class, but NOT both - going to fuck me up
const { contentDefinitions } = require('./content/definitions');

// @jpdev - assetDefintions is not like content atm - its returns object, not class=>object so no deferencing on this one atm
//const { assetDefinitions } = require('./asset/definitions');
const assetDefinitions = require('./asset/definitions');
const taxonomyDefinitions = require('./taxonomy/definitions');
const securityDefinitions = require('./security/definitions');
const entityDefinitions = require('./entity/definitions');

module.exports = gql`

  ${contentDefinitions}
  ${assetDefinitions}
  ${taxonomyDefinitions}
  ${securityDefinitions}
  ${entityDefinitions}

  # @jpdev - not sure why this is here on its own?  Location implies that it would be
  type StubExternal {
    identifier: String
    identifiers: [String]! @arrayValue
    namespace: String
    url: String
  },
  
`;
