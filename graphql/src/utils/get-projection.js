const isObject = require('./is-object');
const { isArray } = Array;

// gets the fields defined on the 'type' typedef
// for example type=AssetImage, it will return
// [
// { type: AssetImage, value: 'id' },
// { type: AssetImage, value: 'fileName' },
// { type: AssetImage, value: 'name' },
// { type: AssetImage, value: 'displayName' },
// { type: AssetImage, value: 'approvedWebsite' },
// { type: AssetImage, value: 'approvedMagazine' },
// { type: AssetImage, value: 'filePath' },
// { type: AssetImage, value: 'src' },
// { type: AssetImage, value: 'alt' },
// { type: AssetImage, value: 'caption' },
// { type: AssetImage, value: 'source' }
// ]

// uses schema for recursive calls to dig into the contents of fragments to resolve those, but the end result is the same, just support for other input cases
// @jpdev @jplearn - I haven't seen the use of InlineFragment or FragmentSpread, so keep an eye out
const getFields = (schema, type, selectionSet, fragments, fields = []) => {
  if (!isObject(selectionSet)) return fields;
  const { selections = [] } = selectionSet;
  selections.forEach((s) => {
    const { kind, name, typeCondition } = s;
    switch (kind) {
      case 'Field':
        fields.push({ type, value: name.value });
        break;
      case 'InlineFragment':
        getFields(
          schema,
          schema.getType(typeCondition.name.value),
          s.selectionSet,
          fragments,
          fields,
        );
        break;
      case 'FragmentSpread':
        getFields(
          schema,
          schema.getType(fragments[name.value].typeCondition.name.value),
          fragments[name.value].selectionSet,
          fragments,
          fields,
        );
        break;
      default:
        break;
    }
  });
  return fields;
};

// refone use case
// schema is your entire schema, loaded straight from info
// type is the returnContentType - in this example you are doing a refOne for primaryImage which returns an AssetImage type
// selectionSet - in this case are objects detailing the fields contained within the AssetImage typeDef (id, fileName, displayName, filePath, etc)
// fragments is null, fields is null
module.exports = (schema, returnType, selectionSet, fragments) => {
  const type = returnType.ofType || returnType;

  // Gets an array of { type, value } objects - ie { type:AssetImage, value:fileName }
  const selected = getFields(schema, type, selectionSet, fragments);

  // merge in additional array of fields to the rolling set if requiresProject is defined
  const { requiresProject } = type;
  const fields = isArray(requiresProject)
    ? selected.concat(requiresProject.map(value => ({ type, value })))
    : selected;

  return fields.reduce((o, field) => {
    const map = field.type.getFields();
    if (!map[field.value]) {
      return o;
    }
    return ({ ...o, ...map[field.value].projection || {} });
  }, {});
};

