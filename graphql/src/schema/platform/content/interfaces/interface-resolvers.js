const inquiryEmails = require('../../../../utils/inquiry-emails');

const resolveType = async ({ type }) => `Content${type}`;

module.exports = {
    /**
     *
     */
    Addressable: {
      __resolveType: resolveType,
      cityStateZip: ({ city, state, zip }) => {
        let out = '';
        if (city && state) {
          out = `${city}, ${state}`;
        } else if (city) {
          out = `${city}`;
        } else if (state) {
          out = `${state}`;
        }
        if (zip) out = `${out} ${zip}`;
        return out || null;
      },
    },
  
    /**
     *
     */
    Authorable: { __resolveType: resolveType },
  
    /**
     *
     */
    Contactable: {
      __resolveType: resolveType,
      website: ({ website }) => {
        if (!website) return website;
        return /^http/.test(website) ? website : `https://${website}`;
      },
    },
  
    /**
     *
     */
    SocialLinkable: { __resolveType: resolveType },
  
    /**
     *
     */
    OrganizationContactable: { __resolveType: resolveType },
  
    /**
     *
     */
    PrimaryCategory: { __resolveType: resolveType },
  
    /**
     *
     */
    Inquirable: {
      __resolveType: resolveType,
      inquiryEmails,
    },
  
    /**
     *
     */
    Media: {
      __resolveType: resolveType,
      fileSrc: ({ fileName, filePath }, _, { site }) => {
        if (!fileName || !filePath) return null;
        const assetHost = site.get('assetHost', defaults.assetHost);
        return `https://${assetHost}/${cleanPath(filePath)}/${fileName}`;
      },
    },

}