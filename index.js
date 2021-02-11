'use strict';
const mergeTrees = require('broccoli-merge-trees');
const stew = require('broccoli-stew');
const path = require('path');
const Funnel = require('broccoli-funnel');
const SynthesizeTemplateOnlyComponents = require('@embroider/compat/src/synthesize-template-only-components')
  .default;
const AddStyleImportsToComponents = require('./lib/add-style-imports-to-components');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      return;
    }

    registry.add('js', {
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
        componentsTree = mergeTrees(
          [componentsTree, synthesizedTemplateOnlyJs],
          {
            overwrite: true,
          }
        );
        let treeWithImports = new AddStyleImportsToComponents([componentsTree]);
        return mergeTrees([tree, treeWithImports], { overwrite: true });
      },
    });
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
