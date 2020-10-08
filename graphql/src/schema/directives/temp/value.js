const { SchemaDirectiveVisitor } = require('graphql-tools');
const { get } = require('@base-cms/object-path');

class ValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    console.log('DIRECTIVE - value');

    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc) => {
      console.log('this.args');
      console.dir(this.args);
      const { localField, fallbackField } = this.args;
      const value = get(doc, localField || field.name);
      if (fallbackField && !value) return get(doc, fallbackField);
      console.log('value');
      console.log(value);
      return value;
    };
  }
}

module.exports = ValueDirective;
