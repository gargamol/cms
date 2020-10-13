const { SchemaDirectiveVisitor } = require('graphql-tools');
//const { getAsArray } = require('object-path');
const { getAsArray } = require('../../utils/object-path-extension');

class ArrayValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      const { localField } = this.args;
      return getAsArray(doc, localField || field.name);
    };
  }
}

module.exports = ArrayValueDirective;
