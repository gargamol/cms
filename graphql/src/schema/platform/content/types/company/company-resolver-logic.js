// @jpdisable
// const googleDataApiClient = require('./google-data-api-client');

// const retrieveYoutubePlaylistId = async ({ youtube }) => {
//   const playlistId = get(youtube, 'playlistId');
//   if (playlistId) return playlistId;

//   const id = get(youtube, 'channelId');
//   const forUsername = get(youtube, 'username');
//   if (!id && !forUsername) return null;
//   const payload = { part: 'contentDetails' };
//   if (id) {
//     payload.id = id;
//   } else {
//     payload.forUsername = forUsername;
//   }
//   const response = await googleDataApiClient.request('youtube.channelList', payload);
//   return get(response, 'items.0.contentDetails.relatedPlaylists.uploads');
// };

class companyResolverLogic {

    static async youtube(parent, variables, context, info) {
        const { youtube = {} } = parent;
        return youtube;
    }

    // @jpdev @jpdisable
    static async youtubeVideos(parent, variables, context, info) {
        return 'NOT IMPLEMENTED';

        // @jpdev - I've seen the 'parent' object sometimes be contextually named, doc, or content, or taxonoy, instead of parent
        // @jpdev - would it be easeir for it to be consistent, or always different but more descriptive?
        // @jpdev - once you are familiar with graph, I think contextually relevant naming is better
        // @jpdev but before then it helps to 'recognize' its the same logic flow as usual
        // const content = parent;
        // const { input } = variables;
        // const { basedb } = context;

        // const maxResults = get(input, 'pagination.limit', 10);
        // const pageToken = get(input, 'pagination.after');
        // const playlistId = await retrieveYoutubePlaylistId(content, basedb);
        // if (!playlistId) return { pageInfo: {}, items: [] };
        // const payload = {
        // playlistId,
        // maxResults,
        // ...(pageToken && { pageToken }),
        // };
        // return googleDataApiClient.request('youtube.playlistItems', payload);
    }

}