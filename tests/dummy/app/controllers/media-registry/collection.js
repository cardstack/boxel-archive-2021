import MediaRegistryIndexController from './index';
import { action } from '@ember/object';
import scale from 'ember-animated/motions/scale';
import move from 'ember-animated/motions/move';
import { parallel } from 'ember-animated';
// import { printSprites } from 'ember-animated';

export default class MediaRegistryCollectionController extends MediaRegistryIndexController {
  @action
  transitionToIsolate(item) {
    this.transitionToRoute('media-registry.item', item.id);
  }

  @action
  transitionToView() {
    this.transitionToRoute('media-registry.collection', this.model.id);
  }

  @action
  transitionToEdit() {
    this.transitionToRoute('media-registry.collection.edit', this.model.id);
  }

  @action
  * transition({ sentSprites, receivedSprites }) {
    // printSprites(arguments[0]);
    for (let sprite of sentSprites) {
      parallel(move(sprite), scale(sprite));
      sprite.applyStyles({ 'z-index': '1' });
    }

    for (let sprite of receivedSprites) {
      parallel(move(sprite), scale(sprite));
      sprite.applyStyles({ 'z-index': '1' });
    }
  }
}
