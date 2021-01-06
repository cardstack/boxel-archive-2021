'use strict';

// const crypto = require('crypto');

const replace = require('broccoli-string-replace');
var BroccoliDebug = require('broccoli-debug');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const environment = EmberApp.env();
const IS_PROD = environment === 'production';
const IS_DEV = environment === 'development';
const IS_TEST = environment === 'test';

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    hinting: false, // Don't lint at build time
    tests: IS_TEST, // Only generate tests files in when running `ember test`
    /*
      Leave jQuery out of this addon's own test suite & dummy app by default,
      so that the addon can be used in apps without jQuery. If you really need
      jQuery, it's safe to remove this line.
    */
    vendorFiles: { 'jquery.js': null, 'app-shims.js': null },

    // our app always uses faker, even in production
    'ember-faker': { enabled: true },

    fingerprint: {
      extensions: ['js', 'css', 'map', 'png', 'jpg', 'gif', 'svg', 'flac'],
      generateAssetMap: true,
      fingerprintAssetMap: true,
      prepend: '/boxel/',
      replaceExtensions: ['html', 'css', 'js', 'json'],
      enabled: IS_PROD,
    },

    // Add options here
    'ember-power-select': { theme: false },
  });

  let config = app.project.config(environment);
  let appTree = app.toTree();

  appTree = new BroccoliDebug(appTree, 'boxel');

  if (IS_DEV || IS_TEST) {
    appTree = replace(appTree, {
      files: ['**/*.css'],
      patterns: [
        {
          match: /\/assets/g,
          replacement: `${config.rootURL}assets`
        },
        {
          match: /url\('\/media-registry/g,
          replacement: `url('${config.rootURL}media-registry`
        },
      ]
    });
  }

  return appTree;
};
