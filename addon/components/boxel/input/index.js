import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Input extends Component {
  @tracked value = this.args.value || '';

  @action onInput(ev) {
    if (this.args.onInput) {
      return this.args.onInput(ev);
    }
    this.value = ev.target.value;
  }
}
