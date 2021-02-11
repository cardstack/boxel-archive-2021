'use strict';
const mergeTrees = require('broccoli-merge-trees');
const stew = require('broccoli-stew');
const path = require('path');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: function () {
    return true;
  },

  treeForApp() {
    let tree = this._super.treeForApp.apply(this, arguments);

    return mergeTrees(
      [this.automaticReexports(), this.copyImagesFromAddon(), tree],
      {
        overwrite: true,
      }
    );
  },

  automaticReexports() {
    // grab all js files from the addon directory, except utils
    let addonFiles = stew.find(
      this.treeGenerator(path.join(__dirname, 'addon')),
      '**/*.+(js|hbs)'
    );
    addonFiles = stew.rm(addonFiles, 'utils/*.*');

    // rewrite them into reexports
    let reexports = stew.map(addonFiles, (_content, relativePath) => {
      let pathWithoutExtension = relativePath
        .replace(/\.(js|hbs)$/, '')
        .replace(/\/index$/, '');
      console.debug(`[boxel] Exporting ${pathWithoutExtension} to app`);
      return `export { default } from "${this.name}/${pathWithoutExtension}";`;
    });
    reexports = stew.rename(reexports, '.hbs', '.js');
    return reexports;
  },

  copyImagesFromAddon() {
    let addonImages = stew.find(
      this.treeGenerator(path.join(__dirname, 'addon')),
      'images/**/*.+(jpg|png|svg)'
    );
    return addonImages;
  },
};
