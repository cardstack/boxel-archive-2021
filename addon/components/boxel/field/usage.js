import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked label = 'Name';
  @tracked value = 'Lila';
  @tracked labelClass;

  @action updateValue(ev) {
    this.value = ev.target.value;
  }
}
