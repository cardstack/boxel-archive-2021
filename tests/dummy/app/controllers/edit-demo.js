import Controller from '@ember/controller';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import adjustCSS from 'ember-animated/motions/adjust-css';
import adjustColor from 'ember-animated/motions/adjust-color';
import { printSprites } from 'ember-animated';
import { easeOut } from 'ember-animated/easings/cosine';
import fade from 'ember-animated/transitions/fade';

export default class EditDemoController extends Controller {
  mode = 'view';
  fade = fade;

  @action setMode(mode) {
    this.model.set('mode', mode);
  }


  * trayTransition ({ keptSprites }) {
    printSprites(arguments[0], 'trayTransition');
    keptSprites.forEach(sprite => {
      adjustColor('background-color', sprite, { easing: easeOut });
    });
  }

  * cardTransition ({ keptSprites }) {
    printSprites(arguments[0], 'cardTransition');
    keptSprites.forEach(sprite => {
      adjustColor('border-color', sprite, { easing: easeOut });
      adjustCSS('border-radius', sprite, { easing: easeOut });
      resize(sprite, { easing: easeOut });
    });
  }

  * headerTransition ({ keptSprites }) {
    printSprites(arguments[0], 'headerTransition');

    keptSprites.forEach(sprite => {
      resize(sprite, { easing: easeOut });
      adjustColor('background-color', sprite, { easing: easeOut });
    });
  }
  * bodyTransition ({ keptSprites }) {
    printSprites(arguments[0], 'bodyTransition');
    keptSprites.forEach(sprite => {
      adjustCSS('border-bottom-left-radius', sprite, { easing: easeOut });
      adjustCSS('border-bottom-right-radius', sprite, { easing: easeOut });
      adjustColor('background-color', sprite, { easing: easeOut });
      // resize(sprite, { easing: easeOut });
    });
  }
}
