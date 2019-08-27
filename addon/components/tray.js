import { action } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/tray';
import move from 'ember-animated/motions/move';
import opacity from 'ember-animated/motions/opacity';
import { printSprites, wait } from 'ember-animated';

@templateLayout(layout)
@tagName('')
export default class TrayComponent extends Component {
  duration = 700;
  preserveScrollPosition = true;
  expanded = false;
  trayAction() {}

  transition = function*({ receivedSprites, sentSprites, duration }) {
    try {
      printSprites(arguments[0]);

      sentSprites.forEach(sprite => {
        move(sprite);
        opacity(sprite, { to: 0, duration: duration * 0.2 });
        sprite.applyStyles({ 'z-index': 1 });
      });

      receivedSprites.forEach(sprite => {
        let diff = sprite.difference('finalBounds', sprite, 'initialBounds');
        sprite.translate(diff.dx, diff.dy);
        sprite.applyStyles({ opacity: 0 });
      });

      if (receivedSprites.length > 0) {
        yield wait(duration * 0.75);
        receivedSprites.forEach(sprite => {
          opacity(sprite, { from: 0, to: 1, duration: duration * 0.2 });
        });
      }
    }

    catch (err) {
      yield wait();
      throw new Error(err);
    }
  }

  @action
  isolate() {
    this.set('expanded', true);
  }
}
