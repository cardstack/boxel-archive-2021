import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { filterBy } from '@ember/object/computed';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { printSprites } from 'ember-animated';
import { easeOut } from 'ember-animated/easings/cosine';
import { default as opacity, fadeOut, fadeIn } from 'ember-animated/motions/opacity';

export default class CardsController extends Controller {
  @filterBy('model', 'expanded', true) expandedCards;

  @action toggle(id) {
    for (let elt of this.model) {
      if (elt.id === id) {
        set(elt, 'expanded', !elt.expanded);
      } else {
        set(elt, 'expanded', false);
      }
    }
  }

  * transition ({ keptSprites }) {
    printSprites(arguments[0], 'transition');
    keptSprites.forEach(sprite => {
      move(sprite, { easing: easeOut });
      resize(sprite, { easing: easeOut });
      adjustCSS('border-radius', sprite, { easing: easeOut });
      adjustCSS('opacity', sprite, { easing: easeOut });
      adjustCSS('padding', sprite, { easing: easeOut });
    });
  }

  * descriptionOpacity ({ insertedSprites, removedSprites, sentSprites, receivedSprites }) {
    printSprites(arguments[0], 'descriptionOpacity');
    // insertedSprites.forEach(sprite => {
    //   opacity(sprite);
    //   adjustCSS('font-size', sprite, { easing: easeOut });
    // });
    // removedSprites.forEach(sprite => {
    //   opacity(sprite);
    //   adjustCSS('font-size', sprite, { easing: easeOut });
    // });
    insertedSprites.forEach(fadeIn);
    removedSprites.forEach(fadeOut);
    sentSprites.forEach(fadeOut);
    receivedSprites.forEach(fadeIn);
  }

  * titleOpacity ({ insertedSprites, removedSprites, receivedSprites }) {
    printSprites(arguments[0], 'titleOpacity');
    let insertedSprite = insertedSprites[0];
    let removedSprite = removedSprites[0];
    // let sentSprite = sentSprites[0];
    // let receivedSprite = receivedSprites[0];

    if (insertedSprite) {
      insertedSprite.startAtSprite(removedSprite);
      opacity(insertedSprite);
      adjustCSS('font-size', insertedSprite, { easing: easeOut });
    }

    receivedSprites.forEach(sprite => {
      opacity(sprite);
      adjustCSS('font-size', sprite, { easing: easeOut });
    });
    // if (insertedSprite) {
    // removedSprite.endAtSprite(insertedSprite);

    // opacity(removedSprite);
    // insertedSprites.forEach(opacity);
    // removedSprites.forEach(opacity);
  }
}
