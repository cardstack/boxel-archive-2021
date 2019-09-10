import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';

import { printSprites } from 'ember-animated';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import scale from 'ember-animated/motions/scale';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { easeOut } from 'ember-animated/easings/cosine';

export default class FormCardsIndexController extends Controller {
  @service boxel;

  @filterBy('model', 'expanded', true) expandedCards;

  @action edit(card) {
    for (let elt of this.model) {
      if (elt.id === card.id) {
        set(elt, 'selected', true);
        set(elt, 'expanded', true);
        this.boxel.moveBoxelToPlane(`boxel-${card.id}`, 'tools');
        this.transitionToRoute('form-cards.edit', card);
      } else {
        set(elt, 'selected', false);
        set(elt, 'expanded', false);
      }
    }
  }

  * transition ({ keptSprites, sentSprites, receivedSprites }) {
    printSprites(arguments[0]);

    keptSprites.forEach(sprite => {
      move(sprite, { easing: easeOut });
      resize(sprite, { easing: easeOut });
      adjustCSS('opacity', sprite, { easing: easeOut });
    });

    sentSprites.forEach(sprite => {
      move(sprite, { easing: easeOut });
      resize(sprite, { easing: easeOut });
      adjustCSS('opacity', sprite, { easing: easeOut });
      sprite.applyStyles({
        'z-index': 2
      });
    });

    receivedSprites.forEach(sprite => {
      move(sprite, { easing: easeOut });
      resize(sprite, { easing: easeOut });
      adjustCSS('opacity', sprite, { easing: easeOut });
      sprite.applyStyles({
        'z-index': 2
      });
    });
  }
}
