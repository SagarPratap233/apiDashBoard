const path = require('path-browserify')

module.exports = {
  webpack: {
    alias: {},
    configure: {
      resolve: {
        fallback: {
          fs: false,
          path: path,
        },
      },
    },
  },
}
