import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Component {
  @tracked displayTools = false;
  @tracked isSelected = false;

  @action toggleSelect() {
    this.isSelected = !this.isSelected;
  }
}
