import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import move from 'ember-animated/motions/move';
import resize from 'ember-animated/motions/resize';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { printSprites } from 'ember-animated';

const borderRadius = adjustCSS.property('border-radius');

export default class CardsController extends Controller {

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
    printSprites(arguments[0]);
    keptSprites.forEach(move);
    keptSprites.forEach(resize);
    keptSprites.forEach(borderRadius);
  }
}
