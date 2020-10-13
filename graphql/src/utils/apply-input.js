const isObject = require('./is-object');
const { isArray } = Array;

module.exports = ({
  query,
  using,
  input,
  siteId,
  siteField = 'site.$id',
}) => {
  // if siteId is present, add it to your query
  const q = siteId ? { ...query, [siteField]: siteId } : query;

  // if using or imput is not sent, return now
  if (!isObject(using) || !isObject(input)) return q;
  
  // otherwise, iterate over your 'using' object and if any key in that object is also defined in your 'input' object (args sent to graph via variables), then add those key/value pairs to the query
  return Object.keys(using).filter(key => typeof input[key] !== 'undefined').reduce((obj, key) => {
    const field = using[key];
    const value = input[key];
    return { ...obj, [field]: isArray(value) ? { $in: value } : value };
  }, q);
};
