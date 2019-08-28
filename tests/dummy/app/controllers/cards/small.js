import Controller from '@ember/controller';
import { action } from '@ember/object';
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
import { printSprites, wait } from 'ember-animated';

export default class CardsSmallController extends Controller {
  isExpanded = false;

  * transition({ insertedSprites, removedSprites }) {
    try {
      printSprites(arguments[0]);

      insertedSprites.forEach(fadeIn);
      removedSprites.forEach(fadeOut);
    }

    catch (err) {
      yield wait();
      throw new Error(err);
    }
  }

  @action toggleExpand() {
    this.toggleProperty('isExpanded');
  }
}
