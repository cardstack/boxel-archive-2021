'use strict';

const { Webpack } = require('@embroider/webpack');
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const mergeTrees = require('broccoli-merge-trees');
const Funnel = require('broccoli-funnel');
const SynthesizeTemplateOnlyComponents = require('@embroider/compat/src/synthesize-template-only-components')
  .default;
const AddStyleImportsToComponents = require('./lib/add-style-imports-to-components');

// const { maybeEmbroider } = require('@embroider/test-setup');
// return maybeEmbroider(app);

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    /*
      Leave jQuery out of this addon's own test suite & dummy app by default,
      so that the addon can be used in apps without jQuery. If you really need
      jQuery, it's safe to remove this line.
    */
    vendorFiles: { 'jquery.js': null, 'app-shims.js': null },

    // our app always uses faker, even in production
    'ember-faker': { enabled: true },

    svgJar: {
      sourceDirs: [
        'tests/dummy/app/images/icons',
        'tests/dummy/app/images/media-registry',
      ],
    },

    // Add options here
    'ember-power-select': { theme: false },
  });

  app.registry.add('js', {
    name: 'add-component-css-imports',
    ext: 'js',
    toTree(tree) {
      let componentsTree = new Funnel(tree, {
        include: ['components/**'],
        allowEmpty: true,
      });
      let synthesizedTemplateOnlyJs = new SynthesizeTemplateOnlyComponents(
        componentsTree,
        ['components']
      );
      componentsTree = mergeTrees([componentsTree, synthesizedTemplateOnlyJs], {
        overwrite: true,
      });
      let treeWithImports = new AddStyleImportsToComponents([componentsTree]);
      return mergeTrees([tree, treeWithImports], { overwrite: true });
    },
  });

  return require('@embroider/compat').compatBuild(app, Webpack, {
    // extraPublicTrees: [extraTreeHere]
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    // staticHelpers: true,
    // staticComponents: true,
    staticAppPaths: ['data'],
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/i,
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
