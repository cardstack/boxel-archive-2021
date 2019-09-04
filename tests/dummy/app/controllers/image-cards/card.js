import Controller from '@ember/controller';
import { action } from '@ember/object';

import { printSprites } from 'ember-animated';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { easeOut } from 'ember-animated/easings/cosine';
import { duration } from './index';

export default class ImageCardsCardController extends Controller {
  @action toggle() {
    this.transitionToRoute('image-cards');
  }

  * transition ({ sentSprites }) {
    printSprites(arguments[0], "card transition: ");

    sentSprites.forEach(sprite => {
      move(sprite, { easing: easeOut, duration });
      resize(sprite, { easing: easeOut, duration });
      adjustCSS('border-radius', sprite, { easing: easeOut, duration });
      sprite.applyStyles({ 'z-index': 1 });
    });
  }
}
