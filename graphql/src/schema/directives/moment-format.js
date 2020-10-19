const { SchemaDirectiveVisitor } = require('graphql-tools');
const moment = require('moment-timezone');
const { get } = require('../../utils/object-path-extension');
const defaults = require('../../defaults');

class MomentFormatDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, { input }, { site }) => {
      const { localField } = this.args;

      const value = get(doc, localField || field.name);
      if (!(value instanceof Date)) return null;

      // Direct input, then site, then core defaults.
      const format = input.format || site.get('date.format', defaults.date.format);
      const timezone = input.timezone || site.get('date.timezone', defaults.date.timezone);

      return moment(value).tz(timezone).format(format);
    };
  }
}

module.exports = MomentFormatDirective;

