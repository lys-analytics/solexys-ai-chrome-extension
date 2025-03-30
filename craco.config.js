const path = require('path');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Configure entry points for content scripts
      webpackConfig.entry = {
        main: path.resolve('src/index.tsx'),
        content: path.resolve('src/content.tsx'),
      };

      // Configure output
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].chunk.js',
      };

      // Modify the MiniCssExtractPlugin to output CSS without hash
      webpackConfig.plugins.forEach(plugin => {
        if (plugin.constructor.name === 'MiniCssExtractPlugin') {
          plugin.options.filename = 'static/css/[name].css';
          plugin.options.chunkFilename = 'static/css/[name].chunk.css';
        }
      });

      // Disable code splitting to make the extension work properly
      webpackConfig.optimization.splitChunks = {
        cacheGroups: {
          default: false,
        },
      };
      
      // Disable runtime chunking as extensions need to load as one file
      webpackConfig.optimization.runtimeChunk = false;

      return webpackConfig;
    },
  },
  // Use PostCSS config from postcss.config.js
  style: {
    postcss: {
      mode: 'file', // Use postcss.config.js file
    },
  },
  devServer: {
    port: 5000
  }
}; 