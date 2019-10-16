import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class TrayComponent extends Component {
  expanded = false;
  trayAction() {}

  @action
  isolate() {
    this.set('expanded', true);
  }
}
