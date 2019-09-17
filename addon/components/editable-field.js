import Component from '@ember/component';
import { computed } from '@ember/object';
import template from '../templates/components/editable-field';
import { layout, tagName } from '@ember-decorators/component';
import fade from 'ember-animated/transitions/fade';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import adjustColor from 'ember-animated/motions/adjust-color';
import { printSprites } from 'ember-animated';
import { easeInAndOut } from 'ember-animated/easings/cosine';
import { toUp, toDown } from 'ember-animated/transitions/move-over';

@layout(template)
@tagName('')
export default class EditableFieldComponent extends Component {
  fade = fade;
  toUp = toUp;
  toDown = toDown;

  // get mode() {
  //   if (this._mode) {
  //     return this._mode;
  //   }

  //   return 'edit';
  // }

  // set mode(mode) {
  //   // console.log('mode', mode);
  //   this._mode = mode;
  // }

  @computed('transition')
  get defaultTransition() {
    if (this.transition) {
      return this.transition;
    }

    return this.fade;
  }

  rules({ newItems }){
    if(newItems[0]){
      return toUp;
    }else{
      return toDown;
    }
  }

  * toUpToDown ({ insertedSprites, removedSprites }) {
    printSprites(arguments[0], 'toUpToDown');

    insertedSprites.forEach(toUp);
    removedSprites.forEach(toDown);
  }

  // * inputTransition ({ keptSprites }) {
  //   printSprites(arguments[0], 'inputTransition');

  //   keptSprites.forEach(sprite => {
  //     move(sprite, { easing: easeInAndOut });
  //     adjustColor('background-color', sprite, { easing: easeInAndOut });
  //     adjustCSS('border-top-left-radius', sprite, { easing: easeInAndOut });
  //     adjustCSS('border-top-right-radius', sprite, { easing: easeInAndOut });
  //   });
  // }
}
