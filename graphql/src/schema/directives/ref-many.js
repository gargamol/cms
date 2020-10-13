const { SchemaDirectiveVisitor } = require('graphql-tools');
const { BaseDB } = require('../../db');

// @jpdev - this is used to tell users about an invalid sort, but seems odd thats just plopped in this file
const { UserInputError } = require('apollo-server-express');

const applyInput = require('../../utils/apply-input');
const criteriaFor = require('../../utils/criteria-for');
const connectionProjection = require('../../utils/connection-projection');
const formatStatus = require('../../utils/format-status');
const buildQuery = require('../../utils/ref-query-builders');
const shouldCollate = require('../../utils/should-collate');

const { isArray } = Array;

class RefManyDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (doc, variables, context, info) => {
      const start = process.hrtime();
      const { input = {} } = variables;
      const { basedb, site } = context;

      const {
        model,
        using,
        criteria,
        withSite,
        siteField,
        refQueryBuilder,
        localField,
        foreignField,
      } = this.args;

      const fieldName = localField || field.name;
      const refs = BaseDB.get(doc, fieldName);
      if (!refs) return BaseDB.paginateEmpty();

      const ids = BaseDB.extractRefIds(isArray(refs) ? refs : [refs]);
      if (!ids.length) return BaseDB.paginateEmpty();

      const {
        status,
        pagination,
      } = input;

      const siteId = input.siteId || site.id();

      // @jpdev - not sure why this is enforced here, an order of operations thing (can't sort by an unkown until to get some results?)
      const isInverse = foreignField !== '_id';
      if (input.sort.order === 'values' && isInverse) throw new UserInputError('Cannot use `values` sort on an inverse reference.');

      const applied = applyInput({
        query: {
          ...criteriaFor(criteria),
          ...formatStatus(status),
          [foreignField]: ids.length === 1 ? ids[0] : { $in: ids },
        },
        using,
        input,
        ...(withSite && siteId && { siteId, siteField }),
      });

      const { query, sort } = await buildQuery(refQueryBuilder, {
        doc,
        currentValues: { query: applied, sort: input.sort },
        variables,
        context,
        info,
      });

      // get the projection values for the types we are going to return
      const projection = connectionProjection(info);

      // @jpdev - oddly does query right here instead of in loader like refOne, but why the difference?
      const result = await basedb.paginate(model, {
        query,
        sort: { ...sort, values: ids },
        ...pagination,
        collate: shouldCollate(sort.field),
        projection,
      });
      basedb.log('@refMany', start, { model });
      return result;
    };
  }
}

module.exports = RefManyDirective;
