import Controller from '@ember/controller';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import adjustCSS from 'ember-animated/motions/adjust-css';
import adjustColor from 'ember-animated/motions/adjust-color';
import { printSprites } from 'ember-animated';
import { easeOut } from 'ember-animated/easings/cosine';

export default class EditDemoController extends Controller {
  mode = 'view';

  @action setMode(mode) {
    this.model.set('mode', mode);
  }


  * trayTransition ({ keptSprites }) {
    keptSprites.forEach(sprite => {
      adjustColor('background-color', sprite, { easing: easeOut });
    });
  }

  * cardTransition ({ keptSprites }) {
    printSprites(arguments[0], 'cardTransition');
    keptSprites.forEach(sprite => {
      adjustColor('border-color', sprite, { easing: easeOut });
      adjustCSS('border-radius', sprite, { easing: easeOut });
    });
  }

  * headerTransition ({ keptSprites }) {
    printSprites(arguments[0], 'headerTransition');

    keptSprites.forEach(sprite => {
      resize(sprite, { easing: easeOut });
    });
  }
  * bodyTransition ({ keptSprites }) {
    printSprites(arguments[0], 'bodyTransition');
    keptSprites.forEach(sprite => {
      adjustColor('background-color', sprite, { easing: easeOut });
    });
  }
}
