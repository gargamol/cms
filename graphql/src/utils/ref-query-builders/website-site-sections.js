const websiteSections = require('../query-builders/website-sections');

// @jpdev - why?  why pass doc, currentValues, variables, context, info - but do it here as doc, currentvalues and spread ...rest?
module.exports = (doc, currentValues, ...rest) => {
  const { _id } = doc;
  const { query, ...values } = currentValues;
  const newValues = { ...values, query: { ...query, 'site.$id': _id } };
  return websiteSections(newValues, ...rest);
};
