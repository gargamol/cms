/* eslint-disable max-len */

// @legacy = getFromRequest
const getRequestHeaders = (req) => {
  const tenant = req.get('x-tenant-key') || req.query['tenant-key'];
  const siteId = req.get('x-site-id') || req.query['site-id'];
  if (!tenant) throw new Error('A required `tenant-key` was not sent. Provide as a header or a query param.');
  return {
    tenant,
    siteId: siteId || undefined,
  };
};

const buildRequestHeaders = (config = {}) => {
  const {
    tenantKey,
    siteId,
  } = config;
  if (!tenantKey) throw new Error('A required configuration value `tenantKey` was not set!');
  return {
    'x-tenant-key': tenantKey,
    ...(siteId && { 'x-site-id': siteId }),
  };
};

module.exports = {
  getRequestHeaders,
  buildRequestHeaders,
  passRequestHeaders: (req) => {
    const {
      tenant,
      siteId,
    } = getRequestHeaders(req);
    return buildRequestHeaders({
      tenantKey: tenant,
      siteId,
    });
  },
};

