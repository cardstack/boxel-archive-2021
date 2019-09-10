import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { inject as service } from '@ember/service';

import { printSprites } from 'ember-animated';
import move from 'ember-animated/motions/move';
import { easeIn, easeOut } from 'ember-animated/easings/cosine';


export default class FormCardsEditController extends Controller {
  @service boxel;

  @action backToList() {
    set(this.model, 'expanded', false);
    this.boxel.moveBoxelToPlane(`boxel-${this.model.id}`, 'space');

    this.transitionToRoute('form-cards');
  }

  * transition({ insertedSprites, removedSprites }) {
    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ y: -1.5 * window.innerHeight })
      move(sprite, { easing: easeIn });
    });

    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ y: -1.5 * window.innerHeight })
      move(sprite, { easing: easeOut });
    });
  }

  * moveBox() {
    printSprites(arguments[0]);
  }
}
