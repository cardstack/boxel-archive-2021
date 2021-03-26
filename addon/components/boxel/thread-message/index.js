import Component from '@glimmer/component';
import { reads, not } from 'macro-decorators';
import move from 'ember-animated/motions/move';
import { fadeIn } from 'ember-animated/motions/opacity';
import { parallel, wait } from 'ember-animated';
import { easeOut } from 'ember-animated/easings/cosine';
// import { printSprites } from 'ember-animated';

export default class ThreadMessageComponent extends Component {
  @reads('args.iconSize', '2.5rem') iconSize;
  @not('args.isRound') hasLogo;

  *transition({ insertedSprites }) {
    // printSprites(arguments[0]);

    for (let sprite of insertedSprites) {
      sprite.startTranslatedBy(0, 30);
      parallel(
        fadeIn(sprite, { easing: easeOut, duration: 200 }),
        move(sprite, { easing: easeOut, duration: 200 })
      );
      // stagger
      yield wait(800);
    }
  }
}
