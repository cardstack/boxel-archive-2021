import Component from '@glimmer/component';
import { action } from '@ember/object';
import resize from 'ember-animated/motions/resize';
import move from 'ember-animated/motions/move';
import { parallel, printSprites } from 'ember-animated';

export default class CardComponent extends Component {
  @action
  * transition({ sentSprites, receivedSprites }) {
    printSprites(arguments[0]);
    for (let sprite of sentSprites) {
      parallel(move(sprite), resize(sprite));
    }

    for (let sprite of receivedSprites) {
      parallel(move(sprite), resize(sprite));
    }
  }
}
