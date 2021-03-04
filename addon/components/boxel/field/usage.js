import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked label = 'Full Name of the Issuer';
  @tracked value = 'Gary Walker';
  @tracked mode = 'edit';
  @tracked labelClass;
  @tracked labelWidth = '7.5rem';
  @tracked labelSize = 'default';
  @tracked labelColor = 'default';
  @tracked labelCase = 'default';

  @action onInput(ev) {
    this.value = ev.target.value;
  }
}
