import Component from '@ember/component';
import { computed } from '@ember/object';
import template from '../templates/components/editable-field';
import { layout, tagName } from '@ember-decorators/component';
import fade from 'ember-animated/transitions/fade';
import { toUp, toDown } from 'ember-animated/transitions/move-over';

@layout(template)
@tagName('')
export default class EditableFieldComponent extends Component {
  fade = fade;
  toUp = toUp;
  toDown = toDown;

  @computed('transition')
  get defaultTransition() {
    if (this.transition) {
      return this.transition;
    }

    return this.fade;
  }

  rules({ newItems }) {
    if (newItems[0]) {
      return toUp;
    } else {
      return toDown;
    }
  }
}
