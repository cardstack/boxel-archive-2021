'use strict';
const crypto = require('crypto');

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const environment = EmberApp.env();
const IS_PROD = environment === 'production';
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
      enabled: !IS_TEST,
      customHash: function(buf) {
        if (IS_PROD) {
          let md5 = crypto.createHash('md5');
          md5.update(buf);
          return md5.digest('hex');
        }

        return '0';
      }
    },

    // Add options here
    'ember-power-select': { theme: false }
  });


  return app.toTree();
};
