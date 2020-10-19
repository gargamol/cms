// @jpdev - this is all screwed up
class companyYoutubeResolverLogic {

  static async videos(parent, variables, context, info) {
      const { videos = [] } = parent;
      videos = videos.filter(v => v);
      return videos; 
  }

  // parent is youtube
  static async url(parent, variables, context, info) {
    const { channelId, username } = asObject(parent);
    if (!channelId && !username) return null;
    if (channelId) return `https://youtube.com/channel/${channelId}`;
    return `https://youtube.com/user/${username}`;
  }
  
}