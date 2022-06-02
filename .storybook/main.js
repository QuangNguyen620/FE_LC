const path = require('path');
const custom = require('../config-overrides');

const maxAssetSize = 1024 * 1024;
module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    // '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/core/ui/common/**/__specs__/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    // '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-create-react-app',
    // 'storybook-css-modules-preset',
    '@storybook/addon-jest',
    'storybook-addon-designs',
  ],
  typescript: {
    reactDocgen: 'react-docgen',
  },
  webpackFinal: async (config, { configType }) => {
    // config.devtool = false;
    // config.mode = 'production';
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30 * 1024,
        maxSize: maxAssetSize,
      },
    };

    const customConfig = custom(config);

    return {
      ...config,
      module: { ...config.module, rules: customConfig.module.rules },
    };
  },
  // async managerWebpack(baseConfig, options) {
  //   baseConfig.devtool = false;
  //   baseConfig.mode = 'production';
  //   baseConfig.optimization = {
  //     splitChunks: {
  //       chunks: 'all',
  //       minSize: 30 * 1024,
  //       maxSize: maxAssetSize,
  //     },
  //   };
  //   baseConfig.performance = {
  //     maxAssetSize: maxAssetSize,
  //   };
  //   return baseConfig;
  // },
  // async webpack(baseConfig, options) {
  //   baseConfig.devtool = false;
  //   baseConfig.mode = 'production';
  //   baseConfig.optimization = {
  //     splitChunks: {
  //       chunks: 'all',
  //       minSize: 30 * 1024,
  //       maxSize: maxAssetSize,
  //     },
  //   };
  //   baseConfig.performance = {
  //     maxAssetSize: maxAssetSize,
  //   };
  //   return baseConfig;
  // }
};
