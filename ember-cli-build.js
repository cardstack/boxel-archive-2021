'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

// const { maybeEmbroider } = require('@embroider/test-setup');
// return maybeEmbroider(app);

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    /*
      Leave jQuery out of this addon's own test suite & dummy app by default,
      so that the addon can be used in apps without jQuery. If you really need
      jQuery, it's safe to remove this line.
    */
    boxel: {
      preserveAddonUsageFiles: true,
      processColocatedAppCss: true,
    },
    vendorFiles: { 'jquery.js': null, 'app-shims.js': null },

    // our app always uses faker, even in production
    'ember-faker': { enabled: true },

    // Add options here
    'ember-power-select': { theme: false },
  });

  return require('@embroider/compat').compatBuild(app, Webpack, {
    // extraPublicTrees: [extraTreeHere]
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    // staticHelpers: true,
    // staticComponents: true,
    staticAppPaths: ['data'],
    packagerOptions: {
      publicAssetURL:
        process.env.DEPLOY_TARGET === 's3-preview'
          ? 'https://boxel-assets.s3.amazonaws.com/'
          : undefined,
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf|flac)$/i,
              loader: 'file-loader',
              options: {
                name: '[path][name]-[contenthash].[ext]',
              },
            },
          ],
        },
      },
      // publicAssetURL: '/boxel/'
    },
  });
};
