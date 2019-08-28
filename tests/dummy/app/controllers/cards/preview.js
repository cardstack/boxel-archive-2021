import Controller from '@ember/controller';
import { action } from '@ember/object';
import move from 'ember-animated/motions/move';
import scale from 'ember-animated/motions/scale';
import { parallel, printSprites, wait } from 'ember-animated';

export default class CardsPreviewController extends Controller {

  * transition ({ receivedSprites, sentSprites }) {
    try {
      printSprites(arguments[0]);

      receivedSprites.concat(sentSprites).forEach(sprite => {
        sprite.applyStyles({
          'z-index': 1
        });
      });

      receivedSprites.forEach(parallel(scale, move));
      sentSprites.forEach(parallel(scale, move));
    }

    catch (err) {
      yield wait();
      throw new Error(err);
    }
  }
}
