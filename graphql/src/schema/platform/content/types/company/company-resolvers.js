const { companyResolverLogic } = require('./company-resolver-logic');
const { companyYoutubeResolverLogic } = require('./company-youtube-resolver-logic');

module.exports = {

  ContentCompany: {
    // @jpdev - better for these to be consistent, or should names and which ones are passed differ based on funcion need?
    youtube: (parent, variables, context, info) => companyResolverLogic.youtube(parent, variables, context, info),
    // @jpdisable - I have this disabled within logic file atm
    //dsfyoutubeVideos: (parent, variables, context, info) => companyResolverLogic.youtubeVideos(parent, variables, context, info),
  },

  ContentCompanyYoutube: {
    // @jpdev - this stuff is all screwy - we should look to revise this whole company youtube stuff
    videos: (parent, variables, context, info) => companyYoutubeResolverLogic.videos(parent, variables, context, info),
    url: (parent, variables, context, info) => companyYoutubeResolverLogic.url(parent, variables, context, info),
  },

};
