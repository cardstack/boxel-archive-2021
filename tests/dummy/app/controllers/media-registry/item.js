import Controller from '@ember/controller';
import { action } from '@ember/object';
import scale from 'ember-animated/motions/scale';
import move from 'ember-animated/motions/move';
import { parallel } from 'ember-animated';
import { formatId } from '@cardstack/boxel/utils/format-id';
// import { printSprites } from 'ember-animated';

export default class MediaRegistryItemController extends Controller {
  get itemId() {
    if (!this.model || !this.model.song_title) { return null; }
    return formatId(this.model.song_title);
  }

  @action
  transitionToEdit() {
    this.transitionToRoute('media-registry.item.edit', this.itemId);
  }

  @action
  transitionToView() {
    this.transitionToRoute('media-registry.item', this.itemId);
  }

  @action
  * transition({ sentSprites, receivedSprites }) {
    // printSprites(arguments[0]);
    for (let sprite of sentSprites) {
      parallel(move(sprite), scale(sprite));
      sprite.applyStyles({ 'z-index': '2' });
    }

    for (let sprite of receivedSprites) {
      parallel(move(sprite), scale(sprite));
      sprite.applyStyles({ 'z-index': '1' });
    }
  }
}
