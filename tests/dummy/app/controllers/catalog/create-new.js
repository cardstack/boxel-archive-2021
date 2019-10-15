import Controller from '@ember/controller';
import { action } from '@ember/object';
import scale from 'ember-animated/motions/scale';
import move from 'ember-animated/motions/move';
import { printSprites, parallel } from 'ember-animated';

export default class CatalogCreateNewController extends Controller {
  @action
  showDetailView(field) {
    this.set('displayDetailView', true);
    this.set('selectedField', field);
  }

  @action
  hideDetailView() {
    this.set('displayDetailView', false);
    this.set('selectedField', null);
  }

  * transition ({ insertedSprites, removedSprites, beacons }) {
    printSprites(arguments[0]);

    insertedSprites.forEach(sprite => {
      sprite.startAtSprite(beacons.field);
      parallel(move(sprite, scale(sprite)));
      sprite.applyStyles({ 'z-index': 3 });
    });

    removedSprites.forEach(sprite => {
      sprite.endAtSprite(beacons.field);
      parallel(move(sprite, scale(sprite)));
      sprite.applyStyles({ 'z-index': 3 });
    });
  }
}
