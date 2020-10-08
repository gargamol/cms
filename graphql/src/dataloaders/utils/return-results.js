const sift = require('sift').default;

/**
 * Takes array of result sets and creates a result hash map
 * based on each document id.
 *
 * For example, given the `resultSets` of:
  ```
  [
    [
      { _id: 56174, alias: 'tactical/firearms/handguns' },
      { _id: 56203, alias: 'tactical/swat/knives-tools' },
      { _id: 56211, alias: 'training-careers/domestic-response' },
      { _id: 56212, alias: 'training-careers/education' },
      { _id: 56221, alias: 'on-the-street' },
      { _id: 56374, alias: 'command-hq' },
      { _id: 56397, alias: 'command-hq/supplies-services/recognition-accreditation' },
    ],
    [
      { _id: 56161, alias: 'tactical/firearm-accessories/holsters', name: 'Holsters' },
    ],
  ]
  ```
 * The follow hash map would be created:
  ```
  {
    '56174': { _id: 56174, alias: 'tactical/firearms/handguns' },
    '56203': { _id: 56203, alias: 'tactical/swat/knives-tools' },
    '56211': { _id: 56211, alias: 'training-careers/domestic-response' },
    '56212': { _id: 56212, alias: 'training-careers/education' },
    '56221': { _id: 56221, alias: 'on-the-street' },
    '56374': { _id: 56374, alias: 'command-hq' },
    '56397': { _id: 56397, alias: 'command-hq/supplies-services/recognition-accreditation' },
    '56161': { _id: 56161, alias: 'tactical/firearm-accessories/holsters', name: 'Holsters' },
  }
  ```
 * This hash is then mapped against the original keys provided to the data loader.
 * This ultimately allows results to be returned from the data loader
 * in the order the keys were requested.
 */

module.exports = (resultSets, keys) => {
  const resultHash = resultSets
    .reduce((o, docs) => docs.reduce((h, doc) => ({ ...h, [doc._id]: doc }), o), {});
  // eslint-disable-next-line no-unused-vars
  return keys.map(([id, _, query]) => {
    const doc = resultHash[id] || null;
    if (!doc) return doc;
    // Fallback to an empty `{}` filter when `query` is not set.
    // Convert `[field].$id` values to `[field].oid` values so DBRefs are properly queried.
    const q = query || {};
    const regex = /\.\$id$/;
    const siftQuery = Object.keys(q).reduce((o, key) => {
      const value = q[key];
      const newKey = regex.test(key) ? key.replace(regex, '.oid') : key;
      return { ...o, [newKey]: value };
    }, {});

    const ret = [doc].filter(sift(siftQuery))[0];
    return ret;
    
    // @jpdev - this seems stupid, it just filters out results which don't match the siftQuery - but why will result set that we just ran have items in it that don't match teh query in the first place???
    // @jpdev @jpfix - this works ith the 7.0.1 version of sift, but I had to change it for 13.x I'm using - make sure there are no side effects.
    //return [doc].filter(sift(siftQuery));
    //return sift(siftQuery, [doc])[0];
  });
};
