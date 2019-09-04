import Controller from '@ember/controller';
import { action } from '@ember/object';

import { printSprites } from 'ember-animated';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { easeOut } from 'ember-animated/easings/cosine';

export let duration = 700;

export default class ImageCardsIndexController extends Controller {
  @action toggle(card) {
    this.transitionToRoute('image-cards.card', card);
  }

  * transition ({ sentSprites }) {
    printSprites(arguments[0], "index transition: ");

    sentSprites.forEach(sprite => {
      move(sprite, { easing: easeOut, duration });
      resize(sprite, { easing: easeOut, duration });
      adjustCSS('border-radius', sprite, { easing: easeOut, duration });
    });
  }
}
