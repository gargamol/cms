require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server');

// used in the loaders thing
const { keys } = Object;
const { log } = console;
const isObject = require('./utils/is-object');

// used to define tenant-key and siteId from incoming requests
const { getRequestHeaders } = require('./utils/request-headers');

// used to create BaseDB class (mongo client connection, select db/col, low level queries to mongo)
const createBasedbClient = require('./utils/create-basedb-client');

// loads site product from mongo to be available broadly
const loadSiteContext = require('./utils/site-context/load');

// needed for refOne/refMany other stuff
const createLoaders = require('./dataloaders');

// could probably just set here, more of the include a wrapper that includes a list type of thing thats done alot in base-cms code
//const schema = require('./graphql/schema');
const schema = require('./schema');

// @jpdev - old code, just leaving around for poosbile info when I'm doing auth
const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};

const server = new ApolloServer({
  schema,

  context: async ({ req }) => {

    const tokenWithBearer = req.headers.authorization || "";
    const token = tokenWithBearer.split(" ")[1];
    const userValid = getUser(token);

    // get tenant and sideId from request headers ()
    const { body } = req;
    const { tenant, siteId } = getRequestHeaders(req);

    // @jpclean - haven't seen what this is used/needed for yet - eliminate or wait to see purpose before 'cleaning up'?
    const dbContext = {
      type: 'Apollo GraphQL Request',
      clientName: req.get('apollographql-client-name'),
      clientVersion: req.get('apollographql-client-version'),
      operationName: body.operationName,
      variables: body.variables,
    };

    // inject the BaseDB class and its functionality to be available throughout the application 
    // (mongo client, connection, low level selectors, query point of contact, etc)
    const basedb = createBasedbClient(tenant, dbContext);

    // Load the (optional) site context from the database.
    // query and load the site product from mongo, using the first type:Site from Platform/Product if no siteId in headers
    // Uses defaults.js for any missing site values (image host, etc) are empty
    const site = await loadSiteContext({ siteId, basedb, tenant });

    // dataloaders used as a caching solution for references lookup
    // @jpdev - used in refOne/refMany, other stuff?  dig into how it works after its working
    const loaders = createLoaders(basedb);

    return {
      userValid,

      tenant,
      basedb,
      site,
      loaders,

      // @jpdev - why is this not in a file like the rest?  seems messy, there a reason for it?
      load: async (loader, id, projection, criteria = {}) => {
        if (!loaders[loader]) throw new Error(`No dataloader found for '${loader}'`);

        const query = isObject(criteria) ? criteria : {};
        const queryKeys = keys(query);
        const sortedQuery = queryKeys.sort().reduce((o, key) => ({ ...o, [key]: query[key] }), {});

        const fieldKeys = isObject(projection) ? keys({ ...projection, _id: 1 }) : [];
        // Need to also project by any query fields.
        const sortedFields = fieldKeys.concat(queryKeys).sort();

        return loaders[loader].load([
          id,
          sortedFields.length ? sortedFields : null,
          queryKeys.length ? sortedQuery : null,
        ]);
      },
    };
  },
});

// The `listen` method launches a web server.
server.listen(4000).then(({ url }) => {
  log(`Server ready at ${url}`);
});
