import Controller from '@ember/controller';
import { action, set } from '@ember/object';

import { printSprites } from 'ember-animated';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import opacity from 'ember-animated/motions/opacity';
import { easeInAndOut } from 'ember-animated/easings/cosine';

import scale from '../../motions/scale';
import { duration } from './index';

export default class FormCardsEditController extends Controller {
  @action backToList() {
    set(this.model, 'expanded', !this.model.expanded);
    this.transitionToRoute('form-cards');
  }

  * backgroundTransition ({ insertedSprites, removedSprites, sentSprites, receivedSprites }) {
    printSprites(arguments[0], 'edit background transition');

    insertedSprites.concat(receivedSprites).forEach(function(sprite) {
      sprite.startAtPixel({ y: -1.5 * window.innerHeight });
      move(sprite, { easing: easeInAndOut, duration });
      sprite.applyStyles({ 'z-index': 2 });
    });

    removedSprites.concat(sentSprites).forEach(sprite => {
      sprite.endAtPixel({ y: -1.5 * window.innerHeight })
      move(sprite, { easing: easeInAndOut, duration });
      sprite.applyStyles({ 'z-index': 2 });
    });
  }

  * boxTransition({ sentSprites, removedSprites }) {
    printSprites(arguments[0], 'edit box transition');

    sentSprites.forEach(sprite => {
      move(sprite, { easing: easeInAndOut, duration });
      resize(sprite, { easing: easeInAndOut, duration });
      sprite.applyStyles({
        'z-index': 3
      });
    });

    // TODO: scaling/endAtPixel is not correct
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({
        x: sprite.initialBounds.left,
        y: sprite.initialBounds.top
      });
      scale(sprite, { by: 0.75, easing: easeInAndOut, duration });
      opacity(sprite, { to: 0, easing: easeInAndOut, duration });
      move(sprite, { easing: easeInAndOut, duration });
      sprite.applyStyles({
        'z-index': 2
      });
    });
  }

  * shadowTransition({ sentSprites, removedSprites }) {
    printSprites(arguments[0], 'edit shadow transition');

    sentSprites.forEach(sprite => {
      move(sprite, { easing: easeInAndOut, duration });
      resize(sprite, { easing: easeInAndOut, duration });
      opacity(sprite, { to: 0, easing: easeInAndOut, duration });
      sprite.applyStyles({
        'z-index': 3
      });
    });

    // TODO: scaling/endAtPixel is not correct
    removedSprites.forEach(sprite => {
      sprite.endAtPixel({
        x: sprite.initialBounds.left,
        y: sprite.initialBounds.top
      });
      move(sprite, { easing: easeInAndOut, duration });
      scale(sprite, { by: 0.75, easing: easeInAndOut, duration });
      opacity(sprite, { to: 0, easing: easeInAndOut, duration });
      sprite.applyStyles({
        'z-index': 2
      });
    });
  }
}
