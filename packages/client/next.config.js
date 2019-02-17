// next.config.js
const withTypescript = require("@zeit/next-typescript");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withTypescript({
  webpack(config, options) {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty",
    };

    // Do not run type checking twice:
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())

    return config;
  },
});
