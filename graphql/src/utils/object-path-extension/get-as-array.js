const { get } = require('object-path');
//const { asArray } = require('../as-array');
const asArray = require('./as-array');

module.exports = (obj, path) => asArray(get(obj, path, []));
