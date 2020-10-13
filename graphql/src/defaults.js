// @jpdev - these seem to never change, but is the filesystem the best place for it?  Seems like a hedging a bet that it will not need to change, but if so, not littered around the code
// Confirmed uses - Asset definitions

module.exports = {
  imageHost: 'base.imgix.net',
  assetHost: 'cdn.baseplatform.io',
  date: {
    timezone: 'America/Chicago',
    format: 'MMM Do, YYYY',
    locale: 'en',
  },
  language: {
    primaryCode: 'en',
    subCode: 'us',
  },
};

