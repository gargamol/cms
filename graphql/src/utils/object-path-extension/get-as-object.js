const { get } = require('object-path');
const { asObject } = require('./as-object');

module.exports = (obj, path) => asObject(get(obj, path, {}));
