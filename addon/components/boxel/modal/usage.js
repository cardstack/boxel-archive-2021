import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ModalUsage extends Component {
  @tracked open = false;
  @tracked overlayClass = 'red';

  @action
  onClose() {
    this.open = false;
  }
}
