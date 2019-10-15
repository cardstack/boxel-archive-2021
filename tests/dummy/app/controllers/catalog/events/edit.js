import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import adjustColor from 'ember-animated/motions/adjust-color';
import { default as opacity } from 'ember-animated/motions/opacity';
import { printSprites, wait } from 'ember-animated';
import { easeInAndOut } from 'ember-animated/easings/cosine';
import { animationDelay } from '../../catalog/events';

export default class CatalogEventsEditController extends Controller {
  showModeMenu = false;

  @action
  viewGridPage() {
    set(this.model, 'selected', true);
    this.transitionToRoute('catalog.events');
  }

  @action
  toggleModeMenu() {
    set(this, 'showModeMenu', !this.showModeMenu);
  }

  * backgroundTransition({ receivedSprites }) {
    receivedSprites.forEach(sprite => {
      adjustColor('background-color', sprite, { easing: easeInAndOut });
    });
  }

  * topbarTransition({ insertedSprites, removedSprites }) {
    if (insertedSprites.length) { //wait for tray animation to finish
      yield wait(500);
    }

    insertedSprites.forEach(sprite => {
      sprite.startAtPixel({ y: 150 });
      sprite.applyStyles({ 'z-index': 0 });
      move(sprite, { easing: easeInAndOut });
    });

    removedSprites.forEach(sprite => {
      sprite.endAtPixel({ y: sprite._initialBounds.bottom });
      sprite.applyStyles({ 'z-index': 1 });
      move(sprite, { easing: easeInAndOut, duration: 200 });
    });
  }


  * trayAnimation({ receivedSprites }) {
    receivedSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      sprite.applyStyles({ 'z-index': 1 });
    });
  }

  * cardTransition({ sentSprites, receivedSprites }) {
    sentSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      sprite.applyStyles({ 'z-index': 2 });
    });

    receivedSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      sprite.applyStyles({ 'z-index': 2 });
    });
  }

  * imageTransition({ sentSprites }) {
    // printSprites(arguments[0], 'image transition');
    sentSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      sprite.applyStyles({ 'z-index': 3 });
    });
  }

  * headerTransition({ sentSprites }) {
    sentSprites.forEach(sprite => {
      move(sprite);
      sprite.applyStyles({ 'z-index': 3 });
    });
  }

  * bodyTransition({ sentSprites, receivedSprites, duration }) {
    sentSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      opacity(sprite, { to: 0,  duration: duration / 3 });
      sprite.applyStyles({ 'z-index': 4 });
    });

    receivedSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      opacity(sprite, { from: 0 });
      sprite.applyStyles({ 'z-index': 4 });
    });
  }

  * tweenTitle({ sentSprites }) {
    sentSprites.forEach(sprite => {
      move(sprite);
      resize(sprite);
      adjustCSS('font-size', sprite);
      sprite.applyStyles({ 'z-index': 4 });
    })
  }

  * fieldTransition ({ receivedSprites }) {
    printSprites(arguments[0], 'fieldTransition');

    receivedSprites.forEach(sprite => {
      // let { y: y1 } = sprite._offsetSprite.initialBounds;
      // let { y: y2 } = sprite._offsetSprite.finalBounds;
      // sprite.startTranslatedBy(0, y2 - y1);
      move(sprite);
      adjustCSS('border-top-left-radius', sprite, { easing: easeInAndOut });
      adjustCSS('border-top-right-radius', sprite, { easing: easeInAndOut });
      sprite.applyStyles({ 'z-index': 5 });
    });
  }
}
