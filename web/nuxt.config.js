const router = require('./core/router');
require('dotenv').config();

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'websites',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/apollo'],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['@iconify-icons/mdi']
  },

  server: {
    port: 80, // default: 3000
    host: '0.0.0.0', // default: localhost
  },

  apollo: {
    clientConfigs: {
      default: {
        tokenName: 'token',
        httpEndpoint: process.env.HTTP_ENDPOINT,
        httpLinkOptions: {
          headers: {
            'x-tenant-key': process.env.TENANT_KEY,
            'x-cdn-image-hostname': 'base.imgix.net',
            'x-cdn-asset-hostname': 'media.cygnus.com',
          },
        },
      },
    },
  },
  router: {
    extendRoutes(routes, resolve) {
      return router(routes, resolve);
    },
  },
};
