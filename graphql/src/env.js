const envalid = require('envalid');

// declair custom validators to check .env values against
// ---------------------------------------------------------------------------------------------------------------------------------------------------------
const { isURL } = require('validator');
const { makeValidator } = require('envalid');

const natsdsn = makeValidator((v) => {
  const opts = { protocols: ['nats'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a NATS DSN string with nats://');
});

const url = makeValidator((v) => {
  const opts = { protocols: ['http', 'https'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a valid URL with http or https');
});

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

const mongodsn = makeValidator((v) => {
  const opts = { protocols: ['mongodb'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a Mongo DSN string startng with mongodb://');
});
// ---------------------------------------------------------------------------------------------------------------------------------------------------------

const {
  cleanEnv,
  bool,
  port,
  str,
  num,
} = envalid;

module.exports = cleanEnv(process.env, {
  MONGO_DSN: nonemptystr({ desc: 'The Base MongoDB connection URL.' }),
  GRAPHQL_ENDPOINT: nonemptystr({ desc: 'The GraphQL endpoint', default: '/' }),
  PORT: port({ desc: 'The internal port to run on.', default: 80 }),
  EXPOSED_PORT: port({ desc: 'The external port to run on.', default: 80 }),
  NEW_RELIC_ENABLED: bool({ desc: 'Whether New Relic is enabled.', default: true, devDefault: false }),
  NEW_RELIC_LICENSE_KEY: nonemptystr({ desc: 'The license key for New Relic.', devDefault: '(unset)' }),
  ENGINE_API_KEY: nonemptystr({ desc: 'The Apollo Engine API key', devDefault: '(unset)' }),
  BASE4_REST_USERNAME: str({ desc: 'The Base4 REST API username.', default: '' }),
  BASE4_REST_PASSWORD: str({ desc: 'The Base4 REST API password.', default: '' }),
  GOOGLE_DATA_API_URI: nonemptystr({ desc: 'The Google Data API URI', default: 'http://google-data-api' }),
  TOKEN_SECRET: nonemptystr({ desc: 'The token signing secret.' }),
  TOKEN_NAMESPACE: nonemptystr({ desc: 'The UUIDv4 namespace' }),
  TERMINUS_TIMEOUT: num({ desc: 'Number of milliseconds before forceful exiting', default: 1000 }),
  TERMINUS_SHUTDOWN_DELAY: num({ desc: 'Number of milliseconds before the HTTP server starts its shutdown', default: 10000 }),
});