import Route from '@ember/routing/route';
import move from 'ember-animated/motions/move';
import adjustCSS from 'ember-animated/motions/adjust-css';
import { printSprites } from 'ember-animated';
import { easeInAndOut } from 'ember-animated/easings/cosine';

export default class CatalogEventsEditRoute extends Route {
  model({ id }) {
    return this.store.peekRecord('event', id);
  }


  * fieldTransition ({ receivedSprites }) {
    printSprites(arguments[0], 'fieldTransition');

    receivedSprites.forEach(sprite => {
      let { y: y1 } = sprite._offsetSprite.initialBounds;
      let { y: y2 } = sprite._offsetSprite.finalBounds;
      sprite.startTranslatedBy(0, y2 - y1);
      move(sprite);
      adjustCSS('border-top-left-radius', sprite, { easing: easeInAndOut });
      adjustCSS('border-top-right-radius', sprite, { easing: easeInAndOut });
    });
  }
}
