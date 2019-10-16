import Component from '@glimmer/component';
import { computed } from '@ember/object';
import fade from 'ember-animated/transitions/fade';
import { toUp, toDown } from 'ember-animated/transitions/move-over';

export default class BoxelFieldComponent extends Component {
  fade = fade;
  toUp = toUp;
  toDown = toDown;

  @computed('transition')
  get defaultTransition() {
    if (this.args.transition) {
      return this.args.transition;
    }

    return this.fade;
  }

  @computed('args.model.mode')
  get mode() {
    if (this.args.model) {
      return this.args.model.mode;
    }

    if (this._mode) {
      return this._mode;
    }

    return 'view';
  }

  set mode(mode) {
    this.set('_mode', mode);

    return mode;
  }
}
